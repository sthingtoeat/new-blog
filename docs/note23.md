---
title: 单服务器部署多项目
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
server {  
    listen          80;  
    server_name     blog.haruka.website;  # 浏览器输入的网址
  
    location / {  
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
server {  
    listen          80;  
    server_name     game.haruka.website;  
  
    location / {
        proxy_pass http://172.19.0.3:80/; # 改成查到的ip，80端口不变
        proxy_set_header Host $host;  
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        proxy_set_header X-Forwarded-Proto $scheme;  
        
    }  
      
    # 其他location块...  
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

# 下面是另一个项目的反向代理
server {
    listen          80;
    server_name     game.haruka.website;

    location / {
        proxy_pass http://172.19.0.3:80/; # blog是容器名或服务名，并且它在80端口上监听
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

    }

    # 其他location块...
}
```








