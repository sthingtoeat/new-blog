---
title: 安装SSL证书
date: 2024-3-20
tags:
- nginx
---

## 准备工作

给Nginx安装SSL模块，好麻烦啊，我的建议是直接安装带有SSL模块的Nginx。

如果你没有SSL模块，那么请跟着我。

### 1.查找Nginx的安装目录

其实就是Nginx的主程序地址，实在找不到可输入以下指令查找目录：
```sh
ps -ef | grep nginx
```
看到这一句`00:00:00 nginx: master process /usr/sbin/nginx`。

所以安装的目录为：`/usr/sbin`

### 2.查看配置文件路径

查找文件nginx.conf，一般就在`/etc/nginx`,你要是找不到，则输入以下指令查找：
```sh
# 从 /etc 目录下查找文件名为 nginx.conf 的文件
find /ect -name nginx.conf
```

### 3.安装SSL模块

需要从别的Nginx安装包里覆盖过来。

首先你挑一个地方用来放新的Nginx包，版本建议选择一致的。

::: tip 提示
输入`nginx -v`可查看你的Nginx版本
:::

请选择中间的那一列的下载地址，找到你的版本右击复制链接即可[nginx官网](https://nginx.org/en/download.html)

`nginx version: nginx/1.18.0 (Ubuntu)`我这里查出版本为1.18.0，所以选择这个版本：
```sh
cd          # 进入~目录，这里比较空旷

wget https://nginx.org/download/nginx-1.18.0.tar.gz
```
::: tip 提示
如果你没有`wget`,依次输入`sudo apt update`、`sudo apt install wget`即可安装
:::

输入`ls`可以发现目录下红色的安装包。

### 4.编译以及解决报错
```sh
# 解压它
tar -xzf nginx-1.18.0.tar.gz
```

然后`cd nginx-1.18.0`进入解压出来的文件夹，输入以下指令：
```sh
./configure --with-http_ssl_module
```

若出现`checking for C compiler ... not found  ./configure: error: C compiler cc is not found`这种报错，则需要先执行`sudo apt-get install build-essential` 

继续执行`./configure --with-http_ssl_module`，可能会报以下错误,这部分报错参考[这里](https://blog.csdn.net/weixin_45729432/article/details/129493752)
```
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```
按照提示，我们需要安装`pcre`,输入以下指令
```sh
sudo apt-get install libpcre3 libpcre3-dev
```
然后再次执行`./configure --with-http_ssl_module`,可能会再次报以下错误：
```
./configure: error: SSL modules require the OpenSSL library.
You can either do not enable the modules, or install the OpenSSL library
into the system, or build the OpenSSL library statically from the source
with nginx by using --with-openssl=<path> option.
```
这就是说，系统缺少了`OpenSSL`库，我们可以执行以下指令尝试安装它：
```
sudo apt-get install libssl-dev
```
如果你无法安装`OpenSSL`，则可以通过使用`–with-openssl =`选项从源代码构建OpenSSL库,将替换为OpenSSL源代码的路径。即执行:
```sh
./configure --with-openssl=/usr/local/src/openssl-1.1.1j
```

再次执行`./configure --with-http_ssl_module`,可能还会再次报以下错误：
```
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
```
很显然，我们依然缺少了某种东西。这个东西是`zlib`,执行下列指令:
```sh
sudo apt-get install zlib1g
sudo apt-get install zlib1g-dev
```

我到了这里，再次执行`./configure --with-http_ssl_module`，便不再报错了，您如果还有其他的报错，请参考[这里](https://blog.csdn.net/weixin_45729432/article/details/129493752)

执行下列指令：
```
make
```
便可以进行编译，此时目录会出现`objs`文件夹,若出现以下报错：
```
cc1: all warnings being treated as errors
make[1]: *** [objs/Makefile:842: objs/src/event/ngx_event_openssl.o] Error 1
make[1]: Leaving directory '/root/nginx-1.18.0'
make: *** [Makefile:8: build] Error
```
解决办法在[这里](https://blog.csdn.net/humanyr/article/details/107405310)

解决完以后，记得回到`Nginx-1.18.0`这个目录最后重新`make`就可以啦。

### 5.覆盖Nginx

用新的Nginx文件覆盖你之前的老Nginx
```
# ./表示当前目录 #/usr/sbin是本文第1步查到的路径，不要弄错了。
cp ./objs/nginx /usr/sbin
```

若提示`cp: cannot create regular file '/usr/sbin/nginx': Text file busy`,说明你的Nginx没有停止运行,输入`nginx -s stop`即可停止。停止以后再次执行`cp ./objs/nginx /usr/sbin`
::: warning 注意
停止和执行`cp`指令，都不会出现任何提示语句。
:::

这时候，使用下列命令:
```
nginx -V # V需要大写
```
若是出现`configure arguments: --with-http_ssl_module`,说明你的SSL模块启用了。

## 部署SSL证书

证书一般可以免费获取，我的域名在腾讯云里面购买，那么可以去腾讯云进行申请1年的免费SSL证书。

申请完，并审核通过以后，可以把证书下载到本地电脑上。

先去你的服务器上，如果你的项目在容器上，那么进入你的容器，进入目录`/etc/nginx`，使用指令`mkdir cert`新建`cert`文件夹。

然后把电脑上下载的证书文件传到这个文件夹里。
```sh
# 上传文件到服务器space里的blog文件夹里
scp xxx.zip space:blog
```
如果你没有配备免密登录，那么把`space`换成`root@xxx.xx.xxx.xx`,`root`是你的用户名。

好了，这时候服务器进入`blog`文件夹，输入`ls`就可以看到红色字体的zip压缩包。输入`unzip xxxx.zip`即可解压。解压完成以后进入这个文件夹

我们需要解压出来的`.pem`、`.key`这两个文件。把他们传进你之前创建的`cert`文件夹里
```sh
# blog/xxx，的xxx是你解压证书文件后生成的文件夹
# 把里面的.pem传给容器Id为a64221036ee1的/etc/nginx/cert目录下

docker cp blog/xxx/xxx.pem a64221036ee1/etc/nginx/cert
# 参考指令: docker cp haruka.website_bundle.pem a64221036ee1:/etc/nginx/cert


# 传.key文件
docker cp blog/xxx/xxx.key a64221036ee1/etc/nginx/cert
# 参考指令：docker cp haruka.website.key a64221036ee1:/etc/nginx/cert
```

## 更新Nginx.conf配置

进入你的容器,找到`nginx.conf`文件，它一般在`/etc/nginx`目录下，如果你是通过导入配置文件进行配置的，那么去你导入的那个配置文件修改即可。

比如我曾在`nginx.conf`里配置过引入`include /etc/nginx/configs/*.conf`，那么我只需要进入`/etc/nginx/configs/`找到对应的配置文件，并进行修改既可以了。

输入`vim nginx.conf`,修改对应的内容，没有的地方请添加
```sh
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen       443 ssl;
    # 域名，多个以空格分开
    server_name  haruka.website blog.haruka.website;
    
    # ssl证书地址
    ssl_certificate     /etc/nginx/cert/haruka.website_bundle.pem;  # pem文件的路径
    ssl_certificate_key  /etc/nginx/cert/haruka.website.key; # key文件的路径
    
    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    location / {
        root   html;
        index  index.html index.htm;
    }
} # 下方是为了把http重定向成https
server {
    listen       80;
    server_name  haruka.website blog.haruka.website; # 记得修改成你自己的域名
    return 301 https://$server_name$request_uri;
}
```

输入指令`sudo /etc/init.d/nginx start`启动`Nginx`，如果失败了，输入`Nginx -t`查看是否有语法错误。笔者这里出现了这样的错误：
```
nginx: [alert] could not open error log file: open() "/usr/local/nginx/logs/error.log" failed (2: No such file or directory)
2024/03/22 07:42:08 [emerg] 14804#0: open() "/usr/local/nginx/conf/nginx.conf" failed (2: No such file or directory)
nginx: configuration file /usr/local/nginx/conf/nginx.conf test failed
```
第一项为无法打开`/usr/local/nginx/logs/error.log`,经过验证，`local`文件夹下不存在`nginx`及往后的文件，可能是由于覆盖`nginx`导致的，解决方式1，新建对应的路径即可。
::: warning 注意
在`logs`文件里，需要新建`error.log`和`access.log`两个文件。
:::

第二项,因为我想试图改变nginx找配置的路径，但是失败了，所以使用了软连接的方式，把nginx找的路径，链接到我真实放置`nginx.conf`的位置。
```sh
ln -s /etc/nginx/nginx.conf /usr/local/nginx/conf/nginx.conf
```

好了，试试`nginx -t`指令吧，如果显示OK,那么恭喜你成功了。接下来只需要输入指令`sudo /etc/init.d/nginx start`启动`nginx`就可以了。试试访问你的域名吧！

如果你又出现了这样的报错：
```
nginx: [emerg] no "ssl_certificate" is defined for the "listen ... ssl" directive in /etc/nginx/configs/blog.conf:1
nginx: configuration file /usr/local/nginx/conf/nginx.conf test failed
```
那么，可能你忘记在nginx.conf里配置这些东西了：
```
server{
    listen ...
    ....
    ssl_certificate     /etc/nginx/cert/haruka.website_bundle.pem;  
    ssl_certificate_key  /etc/nginx/cert/haruka.website.key; 

    ....
}
```

