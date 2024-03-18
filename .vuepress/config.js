const PluginsConfig = require("./config/PluginsConfig")

module.exports = {
  "title": "Haruka的技术小窝",
  "description": "新主题的博客",
  "dest": "public",
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
    ]
  ],
  plugins:PluginsConfig,        //添加插件请去PulginsConfig.js文件
  "theme": "reco",
  "themeConfig": {
    valineConfig: {
      appId: '8eVxaHwI7dqkulRAoNytxZlm-gzGzoHsz',// your appId
      appKey: '2IDQByzGD7YtsdHPNO5M9PwE', // your appKey
    },
    subSidebar:"auto",    //全局自动子侧边栏
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "学习笔记",
        "icon": "reco-message",
        "link": "/docs/"
        // "items": [
        //   {
        //     "text": "开始学习吧",
        //     "link": "/docs/theme-reco/"
        //   }
        // ]
      },
      {
        "text": "GitHub",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/recoluan",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/": [       //文档的左侧边栏
        "",
        "note1",
        "note2",
        "note3",
        "note4",
        "note5",
        "note6",
        "note7",
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco-2.x",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco-1.x",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "http://v1.vuepress-reco.recoluan.com/views/1.x/mode.html"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Haruka",
    "authorAvatar": "/avatar.jpg",
    "record": "xxxx",
    "startYear": "2024"
  },
  "markdown": {
    "lineNumbers": true
  }
}