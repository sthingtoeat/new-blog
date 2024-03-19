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
  ]

]