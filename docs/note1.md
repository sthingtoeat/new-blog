---
title: vuepress
date: 2024-3-16
tags: 
- vuepress
categories:
- 前端
---
## 写在前面

::: tip 提示
学习这个，你首先需要学习一下`markdown`语法，这个相对简单，主要还是用于写文章，你也可以边写边查，花不了太长时间的，但是调用`vue`组件时需要一些vue的知识。
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

### 1.注册github

你需要注册一个[github](https://github.com/)账户，用于管理代码。什么？你居然没有github?咳咳，这位同学，你也不想项目写炸了以后不能回档吧？具体的注册过程这里就不多赘述了。

### 2.新建仓库

登上github以后，`create a new repository`,给你这个项目取个名,比如我取名为`docs`。选择`public`，不想让人发现你在偷偷打代码的话，你也可以选择`Private`。然后`add .gitignore`这里选择`Node`即可，`licenses`你可以自己挑，也可以不要，然后创建即可。

### 3.克隆仓库到你的本地

点击绿色的`Code`按钮，选择`https`或者`ssh`,复制对应的内容。去你本机想要放项目的位置执行下列指令

```sh
git clone https://github.com/******/****    #这里就是你刚才复制的内容
```
::: warning 注意
如果你复制的是`https`,那么可能会提示你需要验证身份。如何验证身份写在启动服务器之后。
:::

### 4.安装vuepress

克隆完以后，继续输入以下指令安装vuepress
```sh
yarn add -D vuepress
```
等待安装完毕，如果安装不了，建议先百度或者多试几次。若成功，则继续依次执行以下指令。

```sh
npm init -y #初始化

echo '# Hello VuePress' > docs/README.md #创建你的第一篇文章

mkdir docs #创建docs文件夹
```

### 5.修改配置

打开你的VScode，打开到你放项目的那个文件夹。你会发现多了一些文件，打开package.json，在"scripts"这里添加下列语句,注意格式与其他语句一致！
```json
"docs:dev": "vuepress dev docs",
"docs:build": "vuepress build docs"
```
### 6.启动本地服务器
```sh
yarn docs:dev   #docs:dev就是上一步所写的语句vuepress dev docs
```
启动完以后，访问[http://localhost:8080](http://localhost:8080)即可看到你的页面

如果出现了`envelop`的报错，说明你的node.js版本过高,这里是[解决方法](/docs/note7.html)

### 验证身份
```sh
#需要验证邮箱和用户名，如果有多个用户，或者你是第一次使用git，则去掉--global
git config --global user.name "xxx"			#设置全局用户名，信息记录在~/.gitconfig文件中,如果有多个项目需要管理则去掉--global

git config --global user.email "xxx@xxx.com"		#设置全局邮箱地址，信息记录在~/.gitconfig文件中,如果有多个项目需要管理则去掉--global
```

## 图片引用

::: tip 提示
在vuepress中静态资源默认在`.vuepress/public` 中。
:::

官网的两种引用图片方式
[vuepress图片引用](https://vuepress.vuejs.org/zh/guide/assets.html#%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84)

### 方式1

例如图片位置在`.vuepress/public/assets/img`

你可以使用下面的代码,

**注意，请直接写在md文件里面**

```html
<img :src="$withBase('/我不知道.jpg')" alt="foo">
```

图片效果:

<img :src="$withBase('/assets/img/我不知道.jpg')" alt="我不知道">

### 方式2

你也可以使用下面的代码
```md
![我的钱钱没有了](/assets/img/我的钱钱没有了.jpg) 
```

它的使用有点类似于链接的引用，只不过区别在于前面的感叹号罢了

![我的钱钱没有了](/assets/img/我的钱钱没有了.jpg)

## 图片缩放插件medium-zoom

更具体的内容可看官方教程:
[medium-zoom插件的使用](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html)

### 1.安装

去你的项目根目录下执行
```sh
yarn add -D @vuepress/plugin-medium-zoom
# OR npm install -D @vuepress/plugin-medium-zoom
```

### 2.使用

**简单使用一下就可以啦**
```js
module.exports = {
  plugins: ['@vuepress/medium-zoom']
}
```
**如果需要自定义选项的话，应该这样**
```js
module.exports = {
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',//.号后面是class，如果没有类名则别写
      options: {    //这里改css样式
        margin: 16
      }
    }
  }
}
```
**测个小点的图试试看吧**

![logo](/favicon.ico)

**如果你用不了,请先检查selector里的img后面是否有类名，这就是接下去要讲的指定类缩放**

## 指定类缩放

**先假设我们的缩放插件里的内容是这样的**
```js
'@vuepress/medium-zoom': {
      selector: 'img.custom',
    },
```

如此一来，只要是没有类名的图片，都能够缩放,相当于对img这个标签进行选择,添加如下标签

```html
<img class="custom" :src="$withBase('/favicon.ico')" >
```

效果如下

<img class="custom" :src="$withBase('/favicon.ico')" >

同样作为img但是类名不是custom的另一个图
```html
<img :src="$withBase('/favicon.ico')" >
```
<img :src="$withBase('/favicon.ico')" >

是不是就无法进行缩放了？值得一提的是，如果你选择了img标签，也就是
```js
selector: 'img',
```
那么不论你的img类名是什么，只要是img这个标签，它都能进行缩放。

## 侧边栏(vuepress-plugin-auto-sidebar插件)

vuepress自带的侧边栏其实也能用，但是这个插件还能对侧边栏进行排序

[插件介绍](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/)

## 安装

使用如下命令进行安装
```sh
npm i vuepress-plugin-auto-sidebar -D
```

然后在pluginsConfig里面添加
```js
"vuepress-plugin-auto-sidebar":{},
```

接下来删去config.js里面有关sidebar的配置即可，这个插件也能配置nav导航栏，不过具体的还是去看这个插件的介绍吧，这里就不使用了

## 侧边栏标题规则
[侧边栏标题](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#title-%E6%A0%87%E9%A2%98)


## 排序规则

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        // 更多选项: 
        // `asc`、`desc`、`created_time_asc`、`created_time_desc`
        mode: "asc"
      }
    }
  }
}
```

更具体的请参考：

[排序](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#sort-%E6%8E%92%E5%BA%8F)