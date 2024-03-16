---
title: 无法定位到包
date: 2024-3-14
---

## Unable to locate package xxx

::: warning 提示
这一节是在安装nginx时所遇到的坑，后来发现,nginx不需要使用到yum，但是又不甘心删除这一节内容，所以先留在这里。
:::

#### 安装yum包管理器(如果有yum则可跳过这一步)
```sh
sudo apt-get install yum
```
::: warning 注意
如果提示`Unable to locate package yum`的这种问题，那么你需要换一个镜像源
:::

#### 更换一个镜像源(如果yum安装成功，请跳过这一步)
```sh
cd /etc/apt/ #进入这个目录
sudo cp sources.list sources.list.old #复制一个old的副本,防止意外，root用户请去掉sudo
sudo apt-get install vim #真该死啊，基础镜像连vim都没有
sudo vim source.list #vim 进入这个文件
```
先按g + g,再按d + G(shift + g),vim操作参考这个[文档](https://www.runoob.com/linux/linux-vim.html),删除所有，并修改为以下内容。这一步意思是把镜像源替换成了清华大学的，记得按照清华镜像站(找到你的ubuntu版本对应的内容)，下面的是ubuntu22.04的版本
```sh
deb http://archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

```

完成以后，执行下列指令:
```sh
sudo apt-get update 
sudo apt-get install yum 
```
::: warning 注意
如果执行`sudo apt-get update `有报`ca-certificates`这种错，那么执行`apt install ca-certificates`这条指令
:::

::: warning 注意
如果发现`GPG Error:The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 40976EAF437D05B5 NO_PUBKEY 3B4FE6ACC0B21F32`，那么需要执行以下指令:
:::
```sh
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32

#如果执行上面的指令又报`gnupg, gnupg2 and gnupg1 do not seem to be installed,but one of them is required for this operation`,

#那么执行下面这条指令以后再重新执行上面的指令
sudo apt-get install gnupg
```
key如果添加成功，则会显示`gpg: key 40976EAF437D05B5: public key "Ubuntu Archive Automatic Signing Key <ftpmaster@ubuntu.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1`