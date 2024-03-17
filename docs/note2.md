---
title: vuepress-reco主题
date: 2024-3-16
tags:
- vuepress
categories:
- 前端
---

## 介绍
vuepress官网默认的主题是不是不怎么好看？而且也不适合当做博客？接下来推荐一款基于vuepress的新主题：vuepress-reco!

[reco-2.x参考文档](https://vuepress-theme-reco.recoluan.com/docs/theme/frontmatter-home.html)

[reco-1.x参考文档](http://v1.vuepress-reco.recoluan.com/views/1.x/)

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
"scripts": {
    "dev": "vuepress dev . --open --host \"localhost\"",
    "build": "set NODE_OPTIONS=--openssl-legacy-provider && vuepress build ."
},
```

## 评论

想给每篇文章添加评论吗？那就看这里：

[评论参考文档](http://v1.vuepress-reco.recoluan.com/views/1.x/valine.html)

根据你的喜好可以选择`Valine`和`Vssue`。

### Valine
```js
module.exports = {
  theme: 'reco',
  themeConfig: {
    valineConfig: {
      appId: '...',// your appId
      appKey: '...', // your appKey
    }
  }  
}
```
[Valine参考文档](https://valine.js.org/configuration.html)

### Vssue
```js
module.exports = {
  theme: 'reco',
  themeConfig: {
    vssueConfig: {
      platform: 'github',
      owner: 'OWNER_OF_REPO',
      repo: 'NAME_OF_REPO',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    }
  }  
}
```
[Vssue参考文档](https://vssue.js.org/zh/options/)

## 侧边栏

vuepress-reco主题可以设置左侧侧边栏和右侧侧边栏

### 左侧侧边栏
文档左侧侧边栏需要手动去`config.js`添加内容

```js
module.exports = {
themeConfig: {
  sidebar: {
      "/docs/": [       //放文档的文件夹
        "",             //文件夹里README.md文件
        "note1",        //文件名，侧边栏会自动获取文件里面的title信息。
        "note2",
        "note3",
        "note4",
        "note5",
        "note6",
        "note7",
      ]
    },
  }
}
```

### 右侧侧边栏

文档右侧侧边栏可自动生成，只需要开启下面的内容即可。
```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    subSidebar: 'auto'//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
  }
}
```
在md文件的开头这样设置，即可禁用右侧侧边栏
```yaml
---
subSidebar: false
---
```