---
title: vuepress
date: 2024-3-16
---
## 写在前面

::: tip 提示
学习这个，你首先需要学习一下markdown语法，这个相对简单，主要还是用于写文章，你也可以边写边查，花不了太长时间的，但是调用vue组件时需要一些vue的知识。
:::

推荐内容:

[一步步搭建 VuePress 及优化](https://www.bilibili.com/video/BV1vb411m7NY/?share_source=copy_web&vd_source=d333d9f76dc7f7c4895d5e00dc50ba8a)

[markdown语法](https://markdown.com.cn/intro.html)

[markdown的一些小组件,例如提示框](https://vuepress.yiov.top/guide/markdown.html#%E5%AE%B9%E5%99%A8)

[vuepress官网](https://vuepress.vuejs.org/zh/)

## 搭建环境
1.首先你需要一个[git](https://git-scm.com/download)

2.然后是[node.js](https://nodejs.org/en),记得选择LTS版本，会自动更新

3.还需要一个[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable),使用npm可能会导致一些错误

4.再下载一个编辑器，比如[vscode](https://code.visualstudio.com/)

5.都下完以后，打开git bash，在任意位置(比如**桌面**)，输入以下指令,用于确定是否安装完毕
```sh
git --version           #弹出git 版本，如果没有弹出版本，则需要重新安装

node -v                 #同上

npm -v                  #

yarn -v                 #
```

## 创建项目

1.你需要注册一个[github](https://github.com/)账户，用于管理代码。什么？你居然没有github?咳咳，这位同学，你也不想项目写炸了以后不能回档吧？具体的注册过程这里就不多赘述了。

2.登上github以后，create a new repository,给你这个项目取个名,比如我取名为docs。选择public，不想让人发现你在偷偷打代码的话，你也可以选择Private。然后add .gitignore这里选择Node即可，licenses你可以自己挑，也可以不要，然后创建即可。

3.点击绿色的Code按钮，选择https或者ssh,复制对应的内容。去你本机想要放项目的位置执行下列指令

```sh
git clone https://github.com/******/****    #这里就是你刚才复制的内容
```
::: warning 注意
如果你复制的是https,那么可能会提示你需要验证身份。如何验证身份写在启动服务器之后。
:::

4.克隆完以后，继续输入以下指令安装vuepress
```sh
yarn add -D vuepress
```
等待安装完毕，如果安装不了，建议先百度或者多试几次。若成功，则继续依次执行以下指令。

```sh
npm init -y #初始化

echo '# Hello VuePress' > docs/README.md #创建你的第一篇文章

mkdir docs #创建docs文件夹
```

5.打开你的VScode，打开到你放项目的那个文件夹。你会发现多了一些文件，打开package.json，在"scripts"这里添加下列语句,注意格式与其他语句一致！
```json
"docs:dev": "vuepress dev docs",
"docs:build": "vuepress build docs"
```
6.启动本地服务器
```sh
yarn docs:dev   #docs:dev就是上一步所写的语句vuepress dev docs
```
启动完以后，访问[http://localhost:8080](http://localhost:8080)即可看到你的页面

### 验证身份
```sh
#需要验证邮箱和用户名，如果有多个用户，或者你是第一次使用git，则去掉--global
git config --global user.name "xxx"			#设置全局用户名，信息记录在~/.gitconfig文件中,如果有多个项目需要管理则去掉--global

git config --global user.email "xxx@xxx.com"		#设置全局邮箱地址，信息记录在~/.gitconfig文件中,如果有多个项目需要管理则去掉--global
```