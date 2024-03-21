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

::: warning 提示
如果`npm`下不下来,可能是npm,可以使用`yarn`,一旦使用了其中一个，请一直使用它，不能混着用，不然会导致奇怪的问题。

`npm config set registry https://registry.npmmirror.com`更换这个淘宝的镜像，会比较快。

`yarn --network-timeout 300000`设置延时
:::

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
module.exports=[
  [                     //这里两个[],注意一下哦
    "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)你偶尔也挺不错的呢！",
        hideIcon: "/failure.ico",
        hideText: "哼！才没有很羡慕别的网页呢！",
        recoverTime: 2000
      },              
  ]，                 //注意逗号
  [                   //别的插件也需要用中括号括起来
    ......            //下一个插件写这里
  ],

]
```

## 趣味标题

这样安装
```sh
npm i vuepress-plugin-dynamic-title -D

yarn add vuepress-plugin-dynamic-title -D
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

::: warning 注意
如果你发现你添加的插件没有产生对应的效果，那么可能是格式出现了错误，请检查一下，典型的错误就是，中括号的数量，是否把插件用中括号括起来，又或是插件名称拼写错误等。
:::

## 鼠标点击效果

这样安装
```sh
npm install -D vuepress-plugin-cursor-effects

yarn add -D vuepress-plugin-cursor-effects
```

这样使用
```js
'cursor-effects',{
            size: 2, // 粒子大小
            shape: 'star', // 粒子形状（可选 'star' 和 'circle'）
            zIndex: 999999999,
         },
```
## PWA

主要用来提示网站更新。

这样安装
```sh
npm install -D @vuepress/plugin-pwa

yarn add -D @vuepress/plugin-pwa

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
添加****中间这段内容，相应的地方请按照注释修改
```js
//config.js
"head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],//*********下面这一段就是你需要复制粘贴的*****
    ['link', { rel: 'icon', href: '/favicon.ico' }],      //网站icon,地址默认为public
    ['meta', { name: 'author', content: '香饽饽仙贝' }],
    ['meta', { name: 'keywords', content: '学习vuepress' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/icon512_rounded.png' }],              //这里的地址
    ['link', { rel: 'mask-icon', href: '/icons/icon512_maskable.png', color: '#3eaf7c' }],  //还有这里都需要有文件才行
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],//这里好像不用
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    //******************************************************8
  ],
```
在public文件内添加文件`manifest.json`,可以来[这里](https://manifest-gen.netlify.app/)提交`icon`一键生成`manifest.json`等内容

放入以下内容：
```json
{
    "theme_color": "#8936FF",
    "background_color": "#2EC6FE",
    "icons": [
        {
            "sizes": "512x512",
            "src": "/icons/icon512_maskable.png",   //这个位置需要有你的文件
            "type": "image/png"
        },
        {
            "sizes": "512x512",
            "src": "/icons/icon512_rounded.png",    //这里也是
            "type": "image/png"
        }
    ],
    "orientation": "any",
    "display": "standalone",
    "dir": "auto",
    "lang": "zh-CN",
    "name": "香饽饽仙贝",     //这里可以改名
    "short_name": "仙贝"      //
}
```

因为`pwa`仅在`https`协议里生效，你在本地是看不到`pwa`的效果的，但是你如果部署到了`githubPage`里面，那么就可以看到效果了，要是还是没有反应的话请参考这个[视频](https://www.bilibili.com/video/BV1vb411m7NY?p=9&vd_source=4ef976ed3ceae4718cb64b38d30e09da)

::: warning 注意
1.PWA插件需要manifest.json文件，注意配置，没反应的话多看看网页检查报的错误。

2.插件区域别忘记加配置

3.生成的icon文件地址需要对应上，记得看注释
:::

## 看板娘
如果你遇到什么问题，去这个地址找找,插件地址：[live2D](https://github.com/yanjun0501/vuepress-plugin-live2d?tab=readme-ov-file)。

这里推荐一款新的看板娘插件，至少模型更多点：[vuepress-plugin-helper-live2d](https://github.com/JoeyBling/vuepress-plugin-helper-live2d)

这样安装(安装的是**第一款**，第二款请去链接)
```sh
npm i vuepress-plugin-live2d

yarn add vuepress-plugin-live2d
```

这样使用
```js
"vuepress-plugin-live2d",
      {
        "modelName": "",//z16，Epsilon2.1，izumi，koharu，shizuku，miku, hijiki, tororo挑一个名字放进""里
        "mobileShow": false
      }
```

::: tip 提示
如果你遇到什么问题，去这个地址找找,插件地址：[live2D](https://github.com/yanjun0501/vuepress-plugin-live2d?tab=readme-ov-file),里面有相应的文档说明
:::

## 音乐播放器

插件项目地址：[vuepress-plugin-meting](https://github.com/moefyit/vuepress-plugin-meting)

这样安装：
```sh
yarn add vuepress-plugin-meting -D
# or use npm
npm i vuepress-plugin-meting -D
```
这样使用：
```js
'meting',
      {
         metingApi,
         meting,
         aplayer,
         mobile,
         defaultCover,
      },
```

然后加到对应的页面文件上(直接写在md文件里面)
```html
<Meting server="netease"
        type="playlist"
        mid="2539599584"
        :lrc-type="3"/>
```

## 公告栏弹窗
[插件地址](https://vuepress-theme-reco.recoluan.com/views/plugins/bulletinPopover.html)

这样安装
```sh
npm i @vuepress-reco/vuepress-plugin-bulletin-popover -D

yarn add @vuepress-reco/vuepress-plugin-bulletin-popover -D
```

这样使用
```js
['@vuepress-reco/vuepress-plugin-bulletin-popover', {
    width: '260px', // 默认 260px
    title: '消息提示',
    body: [
      {
        type: 'title',
        content: '早上好！',
        style: 'text-aligin: center;'
      },
      {
        type: 'image',
        src: 'https://i0.hdslb.com/bfs/new_dyn/f778764f00ddc92d2afa4da968c56a95438140818.jpg@1256w_1298h_!web-article-pic.avif'
      }
    ],
    footer: [
      {
        type: 'button',
        text: '打赏',
        link: '../'
      } 
    ]
  }]
```

## 代码复制
[插件地址](https://www.npmjs.com/package/vuepress-plugin-nuggets-style-copy)

这样安装
```sh
npm i vuepress-plugin-nuggets-style-copy -D

yarn add vuepress-plugin-nuggets-style-copy -D
```

这样使用
```js
["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功"
      }
   }]
```

## 背景音乐
[插件地址](https://vuepress-theme-reco.recoluan.com/views/plugins/bgmPlayer.html)

这样安装
```sh
npm i @vuepress-reco/vuepress-plugin-bgm-player -D

yarn add @vuepress-reco/vuepress-plugin-bgm-player -D
```

这样使用
```js
[
    '@vuepress-reco/vuepress-plugin-bgm-player',
    {
      audios: [
        {
          name: 'LOSER',
          artist: '米津玄師',
          url: 'https://www.ytmp3.cn/down/73654.mp3',
          cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200'
        }
      ] ,
      // 是否默认缩小
      autoShrink: true ,
      // 缩小时缩为哪种模式
      shrinkMode: 'float',
      // 悬浮窗样式
      floatStyle:{ bottom: '10px', 'z-index': '999999' }
    }
  ]
```