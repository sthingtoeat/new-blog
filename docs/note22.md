---
title: 项目部署-贪吃蛇项目部署
date: 2024-5-7
tags:
- 项目部署
categories:
- Linux
---

最近完成了一个贪吃蛇(kob)项目，同时给它加上了聊天室的功能，现在准备部署上线进行测试

因此记录此篇文章，记录部署过程中出现的一些问题

项目结构为SpringBoot + Vue3 + mySql + RabbitMQ。

准备把它部署在一个容器里

## 拉取镜像

```sh
docker pull ubuntu/nginx # 拉取镜像
           # --name 后面是你给这个容器取的名
docker run --network common --name kob -p 880:80 -p 4443:443 -p 3306:3306 -p 3000:3000 -p 3001:3001 -p 3002:3002 -p 3003:3003 ubuntu/nginx 

# 这时候可能会卡住，Ctrl + C 即可,会关闭这个容器

docker ps -a # 查看所有的容器，包括停止和运行的,记下你这个容器的ID

docker start kob # 启动这个容器

docker exec -it 007def15d001 /bin/bash # 进入这个容器的控制台，007def15d001要改成你容器的id

nginx -v # 检查nginx版本

nginx -V # 查看nginx是否具有ssl模块

```

## 安装ubuntu基本工具

```sh
apt-get update 

apt-get install tmux   #安装tmux

apt-get install sudo   #安装sudo,如果你在root用户下使用，则可以不安装这个

apt-get install vim    #安装vim
```

## 安装mysql

```sh
sudo apt-get install mysql-server # 安装mysql

sudo service mysql start # 启动mysql服务

mysql # 进入mysql

ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '你的密码'; #设置用户名密码,这里用户名和密码最好和本地一致，防止记错

#CTRL + D 即可退出，下次再进就需要输入密码了

mysql -u用户名 -p密码   #-u和-p后面可以空一格也可以不空
```

::: tip 提示
可在这里参考[mysql基本操作](https://blog.csdn.net/m0_47109503/article/details/119796209)
:::

## 安装jdk8

```sh
sudo apt-get install openjdk-8-jdk

java -version # 查看java版本

exit # 退出容器，但不关闭容器，你也可以Ctrl + P 然后Ctrl + Q退出容器但不关闭容器
```

## 配置nginx

由于我们的容器已经带有了nginx且配有ssl模块。那么我们就不需要重新下载
nginx了

```sh
cd /etc/nginx # 进入这个文件夹

vim nginx.conf

```

请在合适的位置输入一下内容,其他也会有像include这样的代码，你就放在它下面就好了
```sh
http {
	server {
		............
	}
    
    ##加入以下神秘代码
	include /etc/nginx/configs/*.conf;
}
```

然后保存退出vim,继续以下的步骤

```sh

mkdir configs # 新建一个文件夹用来存放nginx配置文件

cd configs

vim kob.conf # kob你可以随便取名
```

粘贴以下内容

```sh
server {
        listen       80;                   # 自己设置端口号
        server_name  localhost;        # 自己服务器的ip地址，也可以是应该域名
        # 例如填写game.haruka.website，用户输入该地址时，便会被此nginx接收并处理
        location / {
            root   /usr/share/nginx/dist;        # 这里写项目打包好的dist文件的地址，可以改，这个随意
            index  index.html;               # 需要保证dist中有index.html文件
            try_files $uri $uri/ @router;
        }
        error_page   500 502 503 504  /50x.html;     #错误页面
}
```

::: tip 提示
这里采用的是导入配置的方式，你如果嫌麻烦，可以直接把配置信息写在nginx.conf里面
:::

## 启动nginx

```sh

sudo /etc/init.d/nginx start # nginx,启动！

```

如果显示ok那么就完成了，如果没有，请去`cd /var/log/nginx`查看错误日志

## 打包前端

因为我是vue3项目，点一下build就可以打包了，打包完成会生成一个dist文件夹，把它传送到你在nginx中配置的静态文件地址即可。

本地可以编写一个脚本，用来负责传送dist文件夹
```sh
# 传送dist

scp -r web/dist space:kob  	

# 调用宿主机中的脚本，脚本内容大致为传送dist到kob容器里

ssh space "./update_kob_web.sh"
```

宿主机也编写一个脚本`update_kob_web.sh`复制把宿主机的dist文件传给容器,输入以下内容

```sh
docker cp kob/dist 007def15d001:/usr/share/nginx/dist
```

## 打包后端

给每个微服务模块的pom文件添加以下内容

```xml

    <groupId>com.kob.backend</groupId>
    <artifactId>backend</artifactId>
    <!--添加下面这行，打包成jar包-->
    <packaging>jar</packaging>

    ....

<!--放在</dependencies>下面，添加下面所有内容-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <!--这里写上main方法所在类的路径，每个模块地址不一样需要调整-->
            <configuration>
                <mainClass>com.kob.backend.BackendApplication</mainClass>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

完事了以后，去maven这里找到各个模块的lifecycle，双击里面的`package`,等待完成

完成以后会生成一个`target`文件夹，找到类似`backend-0.0.1-SNAPSHOT.jar`的文件

把他们分别上传至服务器即可。

## 编写文件传送脚本

一个个传太麻烦？那就写一个脚本吧，一键传送

在你的电脑上新建一个sh脚本，输入以下内容

```sh
# 传送四个jar包到宿主机，注意下面的地址是否对应，space是配置了免密登录的服务器":"后面的kob则是新建一个文件夹kob,如果存在则塞入这个文件夹

scp -r backendcloud/backend/target/backend-0.0.1-SNAPSHOT.jar space:kob  	

scp -r backendcloud/botrunningsystem/target/botrunningsystem-0.0.1-SNAPSHOT.jar space:kob  

scp -r backendcloud/chatsystem/target/chatsystem-0.0.1-SNAPSHOT.jar space:kob  

scp -r backendcloud/matchingsystem/target/matchingsystem-0.0.1-SNAPSHOT.jar space:kob  

# 调用宿主机中的脚本，脚本内容大致为传送jar包到kob容器里

ssh space "./update_kob.sh"
```

然后在你的宿主机里面，编辑一个脚本`update_kob.sh`

输入以下内容

```sh
# 复制kob文件夹到容器id为007def15d001的容器中，并把复制的文件夹重命名为kob

docker cp kob 007def15d001:kob
```

::: tip 提示
如果你忘记了容器的id，那么在宿主机里面输入`docker ps`即可查询正在运行的容器id
:::


