---
title: 空
date: 2024-3-16
tags:
- vuepress
categories:
- 前端
---
[reco-2.x](https://vuepress-theme-reco.recoluan.com/docs/theme/frontmatter-home.html)

[reco-1.x](http://v1.vuepress-reco.recoluan.com/views/1.x/)

下面展示的是reco-1.x的安装方式
## 安装/引用
```sh
npm install vuepress-theme-reco --save-dev

# or

yarn add vuepress-theme-reco
```
装不上去的话多装几次，总有能装上的时候的。

或者你可以试试在自己的项目里面引用
```js
// .vuepress/config.js

module.exports = {
  theme: 'reco'
}  
```

## 初始化
如果你是从0开始想要搭建一个博客，那么别忘了在你的空项目文件夹里进行初始化：
```sh
theme-cli init
```

初始化完成以后就可以开始啦。

## 运行/构建
```sh
npm run dev     #运行
npm run build   #构建

#或者

yarn dev        #运行
yarn build      #构建
```
::: warning 注意
如果`build`的过程中出现了`Error: error:0308010C:digital envelope routines::unsupported`这种报错，说明是你Node.js的版本太高啦。具体解决方式在底下。
:::

构建完成以后会在项目文件夹下面生成一个`publc`的文件。

## 解决build时因Node.js版本过高引起的报错

找到项目中的package.json文件，把`dev`和`build`修改成以下内容。其实就是在指令`vuepress xxx`的前面加上了`set NODE_OPTIONS=--openssl-legacy-provider &&`。
```js
//package.json
"dev": "vuepress dev . --open --host \"localhost\"",
"build": "set NODE_OPTIONS=--openssl-legacy-provider && vuepress build ."
```