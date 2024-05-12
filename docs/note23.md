---
title: nginx单服务器部署多项目且开始https访问
date: 2024-5-9
tags:
- nginx
categories:
- Linux
---

::: warning 注意
有个究极大坑，如果你无论怎么调整nginx配置都只会出欢迎界面，那么去`/etc/nginx/`目录下，有个nginx.conf，这个是nginx的主配置文件，注释掉`include /etc/nginx/sites-enabled/*`，这样一来，你再reload试试！是不是就出来了？
:::

我的服务器刚开始有一个博客项目正在运行，想要把贪吃蛇也部署进去，但是因为各种原因，只能删除blog容器，从头开始部署这两个项目。

我们的思路是，宿主机作为主nginx，然后反向代理到其他容器

## 宿主机

这里默认你已经安装了docker

### 1.新建docker网络

```sh
docker network ls # 查看当前的网络

docker network create common # 新建一个网络，取名为common

```

### 2.启动容器

默认你拉取的镜像为ubuntu/nginx，且已拉取完毕

```sh
docker run --network common --name blog ubuntu/nginx #这个容器使用默认端口

#如果出现卡顿则Ctrl + C 退出 再使用docker start xxx(容器的名称) 命令启动

# 下面这个容器需要对端口进行映射，需要什么端口请自行调整
docker run --network common --name kob -p 880:80 -p 4443:443 -p 3306:3306 -p 3000:3000 -p 3001:3001 -p 3002:3002 -p 3003:3003 ubuntu/nginx 

docker ps # 查看正在运行的容器，请记好容器的id
```

### 3.配置宿主机的nginx

```sh
cd /etc/nginx/conf.d # 进入宿主机的conf.d文件夹

docker inspect blog # 查看容器blog的ip地址

```
查询到blog的ip`"IPAddress": "172.19.0.2",`,记好`172.19.0.2`然后进行下一步

```sh

sudo vim blog.conf # 新建blog.conf文件并进入,非root用户请加上sudo
```

输入`:set paste`回车再按`i`然后粘贴以下内容,`ggdG`可以删除文本所有内容

粘贴完毕请检查一下

```sh
# blog.conf
server {  
    listen          80;  
    server_name     blog.haruka.website;  # 浏览器输入的网址
  
    location / {                          # 或者127.0.0.1:80，因为容器在监听80
        proxy_pass http://172.19.0.2:80/; # 填上上面你查到的ip地址
        proxy_set_header Host $host;  
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        proxy_set_header X-Forwarded-Proto $scheme;  
        
    }  
      
    # 其他location块...  
}
```

接下来添加kob.conf文件（你也直接可以把内容粘贴到blog.conf）

```sh
docker inspect kob # 查看容器kob的ip地址
```
查询到kob容器的ip: `IPAddress": "172.19.0.3`

然后
```sh
sudo vim kob.conf
```

粘贴如下内容：

```sh
# kob.conf
server {
    ... # 内容同上，但是注意修改端口

}
```

完事以后记得测试一下,报错了会告诉你哪有问题

```sh
sudo nginx -t # 测试
```

测试通过以后再安装下面的命令启动nginx

```sh
# 在root用户下也可以不用sudo
sudo /etc/init.d/nginx start     # 启动

sudo /etc/init.d/nginx stop      # 停止

sudo /etc/init.d/nginx reload    # 重载，不停止nginx刷新配置文件

sudo /etc/init.d/nginx status    # 查看状态

sudo /etc/init.d/nginx restart   # 重启
```

## blog容器

通过查询，我这里的blog容器id为`cfea658c20a5`

```sh          
#-it 表示分配一个伪终端，下面的id也可以换成容器名
docker exec -it cfea658c20a5 /bin/bash # 进入blog容器的命令行

# 进入容器以后执行
apt-get update 

apt-get install tmux   #安装tmux

apt-get install sudo   #安装sudo,如果你在root用户下使用，则可以不安装这个

apt-get install vim    #安装vim

```

### 配置blog的nginx

```sh

cd /etc/nginx/conf.d # 进入conf.d文件夹

vim blog.conf # 新建并进入blog.conf
```

输入以下内容：
```sh
server {
        listen       80;                   # 自己设置端口号
        server_name  localhost;            # 接收宿主机的转发 
        #access_log  logs/host.access.log  main;
        location / {
            root   /usr/share/nginx/dist;        # 这里写项目打包好的dist文件的地址，可以改，这个随意
            index  index.html;               # 需要保证dist中有index.html文件
            try_files $uri $uri/ @router;
        }
        error_page   500 502 503 504  /50x.html;     #错误页面
}
```

保存以后启动nginx

```sh
sudo /etc/init.d/nginx start     # 启动
```


到这里为止，blog项目就部署好了。如果你想要支持https访问，请看下面

## blog项目启用https

我们需要注意的是，https的ssl需要部署在宿主机中，**容器内是不需要添加的**。

如果你容器的nginx与上面一致，那么它是不用变更的

你申请的ssl证书，只会对应于一个域名，比如我申请的域名`haruka.website`,但是我在nginx中配置的地址为`blog.haruka.website`，这样是不可以的，访问`blog.haruka.website`会变成http协议，所以不能这样使用二级域名，除非你为它申请了这个ssl证书。

```sh
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen       443 ssl;
    # 域名，多个以空格分开
    server_name  haruka.website; # 域名需要和申请的SSL证书一致才能生效

    # ssl证书地址
    ssl_certificate     /etc/nginx/cert/haruka.website_bundle.pem;  # pem文件的路径
    ssl_certificate_key  /etc/nginx/cert/haruka.website.key; # key文件的路径

    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    location / {
        proxy_pass http://172.19.0.2:80/; # 填上上面你查到的ip地址，注意需要改成http,而且监听端口一般为80
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
server {        
    listen       80;
    server_name  haruka.website; # 记得修改成你自己的域名
    return 301 https://$server_name$request_uri;    # 这里不用改
}
```

## kob项目

同理，搭建docker环境，由于是java项目，还需要配置jdk、mysql等内容

具体内容请参考贪吃蛇项目部署，这里不再赘述。

### 配置kob容器的nginx

只需要能访问到静态资源即可
```sh
server {
         listen 80;
         server_name app4536.acapp.acwing.com.cn;

         location / {
            root /usr/share/nginx/dist;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
}

```
然后进行测试即可，通过则记得`reload`一下


## kob 项目启用https

同样的道理，启用https不需要在容器内部修改，只需要对宿主机的nginx进行修改即可。

### nginx反向代理api请求举例

由于我们的项目是vue3 + springboot，需要使用后端的一些api，所以nginx不能只代理静态资源，还需要对api进行代理

前端的任何http通信，同时包括websocoket通信，只要和后端进行了通信，那么就需要修改nginx的`location`，给相应的api分配一个端口举个例子：

```js
//以下是一段js代码，试图向后端发起websocket请求
const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}/`;

socket = new WebSocket(socketUrl);

//由于启用了wss，且使用了一个域名，变成了如下代码，这样便没了端口号
const socketUrl = `wss://app4536.acapp.acwing.com.cn/${store.state.user.token}/`;

socket = new WebSocket(socketUrl);
```

因此，我们需要对这个地址配置相应的nginx反向代理，一般通过代理端口来寻找应用，使其能够访问到服务器中的应用。

我们宿主机中的nginx就需要有：
```sh
# websocket
server{
    ...
    location /websocket { # 转发到这个端口，依然使用http
            proxy_pass http://127.0.0.1:3000; # 3000是应用的端口，下面的内容不能少
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout  36000s;
        }
}
```

再举一个ajax的http请求的例子：
```js
        $.ajax({
                url: "https://app4536.acapp.acwing.com.cn/api/ranklist/getlist/",
                data: {
                    ...
                },
                type: "get",
                success(resp) {
                    ...
                },
                error(resp) {
                    ...
                }
            })
```
如果你有个Http请求如上，想要让它能正确访问到服务器的应用，那么就需要在nginx配置相应的内容

```sh
# http
server{
    ...
    location /api {     #api 便是域名后面的地址，方便解析
            proxy_pass http://127.0.0.1:3000;
        }
}
```

根据上面的两个例子,我们不难得出，请求需要由nginx进行反向代理才能到对应的应用程序上，且会按照请求中的地址进行反向代理。如果每个请求的第一个地址都不一样但是他们通信的端口一样，那么就需要写很多的location,所以加上了/api就不再需要写多个location了。这应该也是一种规范。

### 修改宿主机中的nginx

回归正题。

在宿主机中，修改`kob.conf`如下

```sh
# kob.conf
server {
    listen          80;
    server_name     app4536.acapp.acwing.com.cn;

    rewrite ^(.*)$ https://${server_name}$1 permanent;

}
server {
        listen 443 ssl;     # ssl只需要配在宿主机即可，容器内部不需要
        server_name app4536.acapp.acwing.com.cn;
        ssl_certificate   kob_cert/acapp.pem;
        ssl_certificate_key  kob_cert/acapp.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        charset utf-8;
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        client_max_body_size 10M;

    location /api {     # jar包都被跑在3000端口，直接发给他即可
            proxy_pass http://127.0.0.1:3000;
        }
    location /websocket {
            proxy_pass http://127.0.0.1:3000;       # 如果是websocket还需要添加下面的内容
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout  36000s;
        }
    location / {                          # 把代理转发给容器
        proxy_pass http://127.0.0.1:880/; # 容器的80端口被映射到宿主机的880端口
        proxy_set_header Host $host;        
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

    }
}
```

测试通过以后记得刷新，这样就完事了。







