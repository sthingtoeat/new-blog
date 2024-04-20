const PluginsConfig = require("./config/PluginsConfig")

module.exports = {
  "title": "Haruka的技术小窝",
  "description": "新主题的博客",
  "dest": "public",
  // "base":"/new-blog/",  //base路径，你的github项目的名称，github页面需要添加此行
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
    ],
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
            "link": "https://github.com/sthingtoeat/new-blog",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/": [       //文档的左侧边栏
        {
          title:"开始",
          children:['']
        },
        {
          title:"VuePress",                   //侧边栏分组标题
          children:["note1","note2","note3"]  //组员
        },
        {
          title:"Markdown",
          children:["note4"]
        },
        {
          title:"项目部署",
          children:["note5","note8","note10"] 
        },
        {
          title:"报错解决",
          children:["note6","note7","note9"]
        },
        {
          title:"中间件",
          children:["note12","note13","note14"]//note11还没有添加
        }
      ],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "博客"
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
    "record": "浙ICP备2024075869号",
    "startYear": "2024"
  },
  "markdown": {
    "lineNumbers": true
  }
}