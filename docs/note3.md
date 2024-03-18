---
title: vuepress插件
date: 2024-3-10
tags: 
- vuepress
categories:
- 前端
---

推荐几个插件，用来让你的博客看起来更加牛逼、高级！

首先，为了让config.js文件看起来更清楚，请新建一个文件专门用户安放插件配置。

在`.vuepress`目录下面，新建一个名为`config`的文件夹，然后我们在这个文件夹里面，新建文件`PluginsConfig.js`。

在`config.js`引入文件
```js
//config.js
const PluginsConfig = require("./config/PluginsConfig") //添加此行语句

module.exports = {
    head:...,
    plugins:PluginsConfig,//注意还得加上这里这句，位置可以任意，但是不要放进themeConfig里面
    theme:...,
    themeConfig:...,
}
```

在`PluginsConfig.js`里添加插件
```js
//PluginsConfig.js
module.exports=[    //这里是中括号
    "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 2000
      },
      "vuepress-plugin-boxx"，  //不要忘记加上逗号
      ....
]
```

## 趣味标题

这样安装
```sh
npm i vuepress-plugin-dynamic-title -D
```

这样使用
```js
module.exports = {
  plugins: [
    [
      "dynamic-title",                  //截取这一段放进PluginsConfig.js即可
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 2000
      }
    ]
  ]
}
```

## Boxx随机名人名言

## PWA

主要用来提示网站更新。

这样安装
```sh
npm install -D @vuepress/plugin-pwa
```

这样使用
```js
'@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
        }
    }
```

## 复制弹窗插件

这样安装
```sh
npm install -D vuepress-plugin-nuggets-style-copy
```

这样使用
```js
"vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功!"
      }
    }
```