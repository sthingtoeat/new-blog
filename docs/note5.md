---
title: 部署项目到你的服务器
date: 2024-3-14
tags:
 - Nginx
categories:
 - Linux
---

::: warning 注意
本篇文章只适用于单服务器部署单一项目，如果你想在一台服务器部署多个项目(包括这个博客)那么你在启动容器时，不要将网络设置为host，且需要由宿主机配置nginx进行代理
:::

## 准备工作

1.首先你需要一台云服务器，最好是Linux的，可以选择CentOs或者Ubutun

2.可以买一个便宜的域名，用于地址解析。

## 配置服务器的免密登录

::: tip 免密登录究极概括版
本地:
ssh-keygen #生成公钥私钥

ssh-copy-id qly@xxx.xxx.xxx.xxx #服务器需要有qly这个用户
输完密码即可
:::

### 1.进入你的服务器

输入

```sh
ssh root@xxx.xxx.xxx.xxx     #进入你的服务器，xxx.xxx.xxx.xxx是你服务器的公网IP
```

::: tip 提示
第一次登录会有如下提示：

`The authenticity of host '123.57.47.211 (123.57.47.211)' can't be established.
ECDSA key fingerprint is SHA256:iy237yysfCe013/l+kpDGfEG9xxHxm0dnxnAbJTPpG8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?`

这时输入yes，回车即可，服务器信息会被记录在~/.ssh/known_hosts文件中（这是在你的本地电脑里，而非云服务器）
:::

默认登录端口号为22。如果想登录某一特定端口：
```sh
ssh user@hostname -p 22
```

### 2.创建一个新的用户

root用户权限较大，容易不小心删库,root用户如果删库了，服务器大概没救了。

::: warning 注意
现在是在你的云服务器里
:::

输入以下指令
```sh
adduser xxx    #创建一个用户，xxx是你的新用户名,输完以后看提示然后设置密码
usermod -aG sudo xxx     #给你这个新的用户分配sudo权限,回车以后无任何提示
```

### 3.配置映射信息（可以跳过）
打开git bash，输入以下指令
```sh
cd ~/.ssh   #进入.ssh文件
vim config  #浏览文件config
```
在config文件里面先不要轻举妄动，按`i`键，可以进入输入模式,输入以下指令（手打）
`Host`后面的是给你的服务器取的任意名字,`HostName` 后面则是服务器公网IP,`User`后面则是你的新用户名

```vim
Host space              
    HostName xxx.xxx.xxx.xxx
    User qly
```
输入完毕以后，按下ESC退出输入模式，再按`Shift + :`输入wq,即可退出vim。

### 4.把公钥传给服务器
在你的本地机器输入以下指令，值得注意的是，请把qly换成**你设置的用户名**。
```sh
ssh-copy-id space #如果你跳过了上面的第三步，则把space换成qly@xxx.xxx.xxx.xxx的形式
```
回车完以后再输一遍你的密码即可

::: tip 提示
显示如下即为成功

`Now try logging into the machine, with:   "ssh 'space'"
and check to make sure that only the key(s) you wanted were added.`
:::
到这里为止,用户名qly已经可以免密登录了。

## 安装tmux和docker镜像
### 1.安装tmux

进入你的服务器(qly用户)，输入以下指令(shift + insert可进行粘贴)
```sh
sudo apt-get update #更新apt包索引,回车以后输入密码即可

sudo apt-get install tmux   #安装tmux,tmux可防止意外关闭而终结进程，也可以防止挂机时间过长而断开服务器连接
```

输入

```
tmux
```

即可进入tmux界面,`CTRL + D` 可以退出tmux界面

### 2.安装docker

::: warning 注意
如果你之前安装过docker,请先卸载它。根据下面的文档执行卸载操作，我相信你找得到的。
:::

根据不同的系统选择不同的[docker安装文档(英文)](https://docs.docker.com/engine/)

这里以ubuntu为例。

根据文档，首先创建docker仓库。进入tmux执行下列语句，使用shift + insert可粘贴到tmux
#### 添加docker官方GPG密钥
```sh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```
输完密码以后进入下一步。
#### 设置稳定版仓库

```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

#### 安装Docker Engine-Community

输入
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

输入y,等待下载完成即可。下载速度取决于你的服务器带宽，比较慢的话，可以选择**直接关闭**git窗口，它自己会在服务器里下载。若干时间以后，重新登录服务器，输入指令`tmux a`即可回归原来的界面。

下载完以后执行
```sh
docker images
```

若有信息提示，但是Permision deny则输入以下指令给docker sudo权限
```sh
sudo usermod -aG docker $USER
```
回车以后输入密码，完成以后不会有任何提示。这时退出tmux再退出服务器，重新登录一下服务器，再回到tmux，这时候再次输入
```sh
docker images
```
若显示
```
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```
则说明安装完成啦。


## 拉取一个基础镜像

镜像源有多个，docker官方那个巨慢无比，所以我们一般选择其他的。

### 修改镜像源

这里选择了[腾讯的镜像源](https://cloud.tencent.com/document/product/1207/45596)

进入你的服务器，可以在tmux界面，也可以不在（用户为qly）,输入

```sh
sudo vim /etc/docker/daemon.json
```
按i键进入输入模式，将以下内容粘贴进去
```json
{
   "registry-mirrors": [
   "https://mirror.ccs.tencentyun.com"
  ]
}
```
按ESC退出输入模式，输入:wq即可退出保存。如果你退不出去，就是说明你的权限不够，输入:qa!即可强行退出，但是没有保存文件，你需要在vim的前面加上sudo。

完事了以后输入这个,拉取ubuntu的基础镜像,**你最好别拉基础镜像，拉个有nginx的镜像比较好**，想要其他版本的话自己看着调整。
```sh
docker pull ubuntu
```

完事了以后，输入`docker images`查看拉取的镜像。

## 使用镜像启动一个容器
```sh
docker run -it --network host --name blog ubuntu 
```

`--network host`意为容器使用服务器本机的网络，防止容器内部无法使用网络，`--name blog`后面是你随便取的一个名,这里取名为blog,ubuntu就是你拉的镜像的名，还有其他的设置，如有需要请先百度。

输完指令以后就会自动进入这个容器，你可以选择再配一遍这个容器的免密登录，嫌麻烦的话，也可以不配。但要记住你这个容器的名字，忘记了的话请参考[docker教程](https://www.runoob.com/docker/docker-command-manual.html),这里列出几个例子。

```sh
docker images       #查看docker镜像
docker start blog   #启动名为blog的容器
docker attach blog  #进入名为blog的容器内部
docker ps           #查看当前运行的容器信息，当然也有名字
docker start blog   #启动名为blog的容器。如果提示你的容器已经停止，则执行此条
docker rm blog      #删除名为blog的容器
```

容器启动以后，就变成了一个虚拟的服务器，你在里面乱搞，都不会影响到你租的那个服务器的。而且还可以通过镜像重置虚拟服务器，安全且快捷。

::: warning 注意
想从容器回到你的服务器，千万不用要`CTRL + C`，这样会关闭容器。先`CTRL + P`再`CTRL + Q`就可以离开容器，但是不关闭容器啦。
:::

::: tip 提示
容器可以无限套娃，在容器里面安装docker并拉取一个镜像，然后通过镜像启动容器。这样一来，容器的容器启动了，重复刚才的操作，容器的容器的容器启动了...
:::
## 使用Nginx

本节请参考[如何在 Ubuntu 22.04 上安装 NGINX](https://cn.linux-console.net/?p=14930#:~:text=%E5%A6%82%E4%BD%95%E5%9C%A8%20Ubuntu%2022.04%20%E4%B8%8A%E5%AE%89%E8%A3%85%20NGINX%20%E6%9C%AC%E8%8A%82%E5%88%97%E5%87%BA%E4%BA%86%E4%BB%8E%20Ubuntu%2022.04,install%20nginx%20%E7%AC%AC%203%20%E6%AD%A5%EF%BC%9A%20%E9%80%9A%E8%BF%87%E6%A3%80%E6%9F%A5%20NGINX%20%E7%89%88%E6%9C%AC%E6%9D%A5%E9%AA%8C%E8%AF%81%E5%AE%89%E8%A3%85%EF%BC%9A)

::: warning 注意
我的评价是不如拉一个有nginx的镜像，基础镜像啥都没有，如果你的镜像里面有nginx，那么直接跳过这一步即可。
:::

nginx可作为静态页面的web服务器,nginx的其他功能这里暂时不提，感兴趣的请参考[nginx官方文档](https://nginx.org/en/)。如果你的网站需要java后端，那么还需要再配置一个tomcat才行。这里配置的网站是纯页面的形式，没有任何后端。

### 配置nginx所需环境
首先需要进入你的容器,你要是没用上容器的话，就太对不起之前配docker的这些操作了。接下来，你可以选择安装tmux来进行操作，当然也可以不用。不过为了以防万一，还是得使用它。需要重复安装tmux的操作吗？好的，再告诉你一次，下次可要记住了哦。
```sh
apt-get update 
apt-get install tmux   #安装tmux
apt-get install sudo   #安装sudo
apt-get install vim    #安装vim
```

好了进入tmux以后，就可以正式开始配置环境了。

执行以下指令：
```sh
unminimize #一路y下去即可，如果还有报错，请根据报错信息寻找答案
```
:::tip 提示
`unminimize`这条指令可以将基础版ubuntu容器变为完整版
:::

### 安装nginx
[安装过程参考文档](https://juejin.cn/post/7286310628352557117)

#### 卸载nginx
如果你之前安装过，请先卸载
```sh
apt-get remove nginx nginx-common
apt-get purge nginx nginx-common
apt-get autoremove
apt-get remove nginx-full nginx-common
```
#### 开始安装新的nginx

```bash
sudo apt update #更新
sudo apt install nginx-full #安装,nginx-full是带有ssl模块的方便未来配置https
nginx -v #查看版本
```
::: tip 提示
nginx的配置文件：

`/usr/sbin/nginx`：主程序

`/etc/nginx`：存放配置文件(nginx.conf)

`/usr/share/nginx`：存放静态文件

`/var/log/nginx`：存放日志
:::

### 配置监听端口号、访问IP和代理跨域
nginx.conf可以通过引入其他文件进行配置，我们可以特地创个文件夹来放这种配置文件。

```bash
cd /etc/nginx
mkdir configs
cd configs
vim blog.conf #blog你可以随便取名
```

在blog.conf添加以下信息:
```sh
server {
        listen       80;                   # 自己设置端口号
        server_name  localhost;        # 自己服务器的ip地址，当然也可以是一个域名，即用户输入的地址
        #access_log  logs/host.access.log  main;
        location / {
            root   /usr/share/nginx/dist;        # 这里写项目打包好的dist文件的地址，可以改，这个随意
            index  index.html;               # 需要保证dist中有index.html文件
            try_files $uri $uri/ @router;
        }
        error_page   500 502 503 504  /50x.html;     #错误页面
}
```
::: tip 提示
`vim`在普通模式下键入`ggdG`可以删除所有,`:set paste`可进行粘贴否则`vim`会缩进

因为存在中文，我的建议是一行一行粘贴，顺便修改对应的内容，粘贴中文会出现乱码
:::

加完以后记得修改注释对应的地方，:wq退出，再执行下列指令：
```sh
cd /etc/nginx
vim nginx.conf 
```
切换为输入模式，一直**往下**，在另外**两个**`include`**下面**的位置加上这句话,注意要加上分号：
```sh
include /etc/nginx/configs/*.conf;
```

### 启动nginx
输入以下指令以启动nginx
```sh
systemctl start nginx

sudo /etc/init.d/nginx start #如果上一条指令不行就用这一条

```
下面是nginx的一些操作指令：
```sh
systemctl start nginx #启动
systemctl stop nginx #停止
systemctl reload nginx #重载
systemctl status nginx #查看状态
systemctl restart nginx #重启 

#systemctl 用不了的话则改成下面的
sudo /etc/init.d/nginx start
sudo /etc/init.d/nginx stop
sudo /etc/init.d/nginx reload
sudo /etc/init.d/nginx status
sudo /etc/init.d/nginx restart
```
::: warning 注意
启动会出现两种结果：

1.显示`OK`,启动完成！

2.显示`Fail`,那么需要`cd /var/log/nginx`，`sudo vim error.log`查看看报错信息，有可能是语法错误，比如少了分号。


:::

成功了那么就基本完事了。你可以在浏览器里面输入你服务器的IP地址，如果看到了Nginx的欢迎界面，说明nginx已经完成。

## 上传静态页面文件
找到你本机的项目里已经构建好的dist文件，右击空白处，打开git bash。

::: tip 提示
如果你给容器配备了免密登录，那么直接执行：

`scp -r dist NAME:/usr/share/nginx/dist`,记得把`NAME`换成你容器免密登录时设置的HOST名，执行完就ok了。
:::

首先将dist文件传递到你的服务器里面，然后再传到容器里面
```sh
scp -r dist space:blog/web  #传给服务器blog/web的目录下，没有目录则在服务器里新建一个再传，当然不建也可以的。反正就是找个地方放文件而已。

sudo docker cp blog/web/dist a64221036ee1:/usr/share/nginx #sudo docker cp 主机目录 容器ID:容器目录

```
如果你不知道容器的ID,那么需要在服务器里执行`docker ps`,这样就能看到啦。

做完这些，你再试试访问你的服务器IP地址，应该就出来啦~

## 编写一个用于部署的脚本
每次重新传文件，这样做太麻烦了，把命令全部写在一个脚本里，就可以一键执行了。

我的脚本只是一种参考，

在和dist文件夹同一目录下面，新建一个`deploy_server.sh`文件,并输入：
```sh
#此处脚本用于将构建好的dist文件上传至服务器
scp -r dist space:blog/web #传文件给服务器

ssh space './update_blog.sh'#登录服务器，执行脚本update_blog.sh
```

然后登录你的服务器，输入以下指令:
```sh
vim update_blog.sh 
```
并在里面粘贴这些内容：
```sh
docker cp blog/web/dist a64221036ee1:/usr/share/nginx
```
完事以后退出vim界面，再输入以下指令
```sh
chmod +x update_blog.sh #赋予权限，如果你ls的话，可以发现这个文件变绿了。
```

这样一来就OK了，当你Build完这个项目的时候，就进入dist的同一目录，点击执行`deploy_server.sh`就可以一键完成部署更新啦。
## 不同域名访问对应的容器

[参考](https://kejiweixun.com/blog/run-multiple-docker-container-on-one-server)

