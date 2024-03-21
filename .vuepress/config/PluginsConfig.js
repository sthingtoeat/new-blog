module.exports = [
  [                     //这里两个[],注意一下哦
    "dynamic-title",
    {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)你偶尔也挺不错的呢！",
      hideIcon: "/failure.ico",
      hideText: "哼！才没有很羡慕别的网页呢！",
      recoverTime: 2000
    },
  ],
  [
    'cursor-effects',
    {
      size: 3, // 粒子大小
      shape: 'star', // 粒子形状（可选 'star' 和 'circle'）
      zIndex: 999999999,
    },
  ],
  [
    "vuepress-plugin-live2d",
    {
      "modelName": "z16",
      "mobileShow": false,
      "position":"left"
    }
  ],
  [
    '@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: {
        message: "baka!有新的客人来了，还不快给本王去迎接！",
        buttonText: "这就去！"
      }
    }
  ],
  ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
    width: '260px', // 默认 260px
    title: '公告',
    body: [
      {
        type: 'title',
        content: '早上好！',
        style: 'text-aligin: center;'
      },
      {
        type: 'image',
        src: './assets/img/早上好.jpg'
      }
    ],
    // footer: [
    //   {
    //     type: 'button',
    //     text: '搓头',
    //     link: '../blogs/cetu/cetu.md'
    //   } 
    // ]
  }],
  ["vuepress-plugin-nuggets-style-copy", {
    copyText: "复制代码",
    tip: {
        content: "复制成功"
    }
  }]
]