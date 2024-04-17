/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ec4d1a4e957475afb508e32205e9ad6c"
  },
  {
    "url": "assets/css/0.styles.1fdeee7b.css",
    "revision": "1317686d4673477e7c1c7108ae078725"
  },
  {
    "url": "assets/fonts/iconfont.938fa69e.woff",
    "revision": "938fa69ea89bccb0f20d643cc5f07cbe"
  },
  {
    "url": "assets/fonts/iconfont.ecabaf00.ttf",
    "revision": "ecabaf00c2c5be9907d524bb21a0f0dc"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "assets/img/不学啦.jpg",
    "revision": "1d0c3ea447aed77a8a013c60ed32c7a9"
  },
  {
    "url": "assets/img/不当太刀高手了.jpg",
    "revision": "21234e69a73381b16716e1691815185d"
  },
  {
    "url": "assets/img/伊蕾娜.jpg",
    "revision": "b4d50b94d8162ff31569f93dbad5f484"
  },
  {
    "url": "assets/img/写前端写的.jpg",
    "revision": "230475e458abae79c027e6c79ccb2cd4"
  },
  {
    "url": "assets/img/太刀高手.jpg",
    "revision": "fc7669ebd90dd12e70f358fca5968fcb"
  },
  {
    "url": "assets/img/寄了.jpg",
    "revision": "24b432545c7107653040632babb6e83c"
  },
  {
    "url": "assets/img/我不知道.jpg",
    "revision": "f115809a8f39ffcf21c1835e5574d63b"
  },
  {
    "url": "assets/img/我好菜.jpg",
    "revision": "6895d36c5c908f96907abc320efd720d"
  },
  {
    "url": "assets/img/我是fw.jpg",
    "revision": "6b6a0588daf113ef1951a3730c050ad1"
  },
  {
    "url": "assets/img/我的钱钱没有了.jpg",
    "revision": "7cfc303811e9b1302c5ebb98e02f1af2"
  },
  {
    "url": "assets/img/早上好.jpg",
    "revision": "c3df9ee5e5dc32a924113dd539ed0203"
  },
  {
    "url": "assets/img/没打过.jpg",
    "revision": "e513a3ccf38d19135e87f85cb2207576"
  },
  {
    "url": "assets/img/猫猫无语.jpg",
    "revision": "7e064e2841e804edbcb043eb306d775f"
  },
  {
    "url": "assets/img/生气.jpg",
    "revision": "2564baec5c16625a97af6a3a030940b4"
  },
  {
    "url": "assets/img/红眼大狮子.jpg",
    "revision": "38cbc196c17968213605b2f29937d35d"
  },
  {
    "url": "assets/js/1.df9be625.js",
    "revision": "25be0f5ce36b9f747be6d16ce02ca60f"
  },
  {
    "url": "assets/js/10.8fcb31a4.js",
    "revision": "f8a787ac8f0743fce6ff536ae45d18a9"
  },
  {
    "url": "assets/js/11.9f160155.js",
    "revision": "9f06f0b12b0b61a67a6bcb0f38eb10c7"
  },
  {
    "url": "assets/js/14.d2f7b238.js",
    "revision": "e4e5ffdb6dd69adc5e7d242f21abde1c"
  },
  {
    "url": "assets/js/15.5de4d897.js",
    "revision": "ba33837a8c4f5823b43195632f8aa8cd"
  },
  {
    "url": "assets/js/16.bcfa046a.js",
    "revision": "bc1fab370ffb253a4b229eff3ae6b749"
  },
  {
    "url": "assets/js/17.2c98a6f6.js",
    "revision": "a67a9355f3d5dec83bbb054f7e0743ba"
  },
  {
    "url": "assets/js/18.dba42034.js",
    "revision": "bade68bab39e2b0ced33914226d5bdac"
  },
  {
    "url": "assets/js/19.a8aad420.js",
    "revision": "47ab56f125d181feed8f1d916b6e7737"
  },
  {
    "url": "assets/js/2.ac6d8acf.js",
    "revision": "cac7f921d7fe8bea3191205ea5da1837"
  },
  {
    "url": "assets/js/20.2a244a90.js",
    "revision": "a9b4bdddaab8de7513d4e625e8599279"
  },
  {
    "url": "assets/js/21.429c8d18.js",
    "revision": "11f48b96f536564c086176aae912958b"
  },
  {
    "url": "assets/js/22.dca2696a.js",
    "revision": "482c42bba33efaec2f3d23b9092300dc"
  },
  {
    "url": "assets/js/23.c45e9085.js",
    "revision": "c2194c2009d3e938691ce17363a2fd7b"
  },
  {
    "url": "assets/js/24.dc667c3d.js",
    "revision": "ade90665007996478b02c7599bb5d2ed"
  },
  {
    "url": "assets/js/25.a768204c.js",
    "revision": "f231022cb5881e4f60f4e78a491c6f3a"
  },
  {
    "url": "assets/js/26.45630a62.js",
    "revision": "cc08ce7ca71830ea6756248b36409a71"
  },
  {
    "url": "assets/js/27.420a37c9.js",
    "revision": "f99bd41c4aee2ecc6813dae4e19e5254"
  },
  {
    "url": "assets/js/28.c030e6fc.js",
    "revision": "e42c7eda86356198533c09f952366870"
  },
  {
    "url": "assets/js/29.86e2cf1a.js",
    "revision": "65119eff3cc76113c6bdf06f6febf622"
  },
  {
    "url": "assets/js/3.7ed39532.js",
    "revision": "5307e7d832940e74b1760c33fe0c39e5"
  },
  {
    "url": "assets/js/30.389fbfc2.js",
    "revision": "56b311f44c36b3b380d7b62e57eff08d"
  },
  {
    "url": "assets/js/31.fc35d5cb.js",
    "revision": "609ae1e22a1fd61ab48c81ad1e7e470a"
  },
  {
    "url": "assets/js/32.1eeaed63.js",
    "revision": "3ce1e3da31a2e40cc70acf904bb133ca"
  },
  {
    "url": "assets/js/33.8d24cb31.js",
    "revision": "6bad255b74eaf6fbc5b9bc0f6f238756"
  },
  {
    "url": "assets/js/34.0b977e34.js",
    "revision": "dfab0afadb2797497511948103f045ef"
  },
  {
    "url": "assets/js/35.d0a7fd8c.js",
    "revision": "516e14e71ba085affa903269b4b88eed"
  },
  {
    "url": "assets/js/36.94bb4023.js",
    "revision": "03e4fda813bec8b0eea3caa4c5fc5dcb"
  },
  {
    "url": "assets/js/37.1c16b61e.js",
    "revision": "2c2482eb363fd33e34eea9eef60a3861"
  },
  {
    "url": "assets/js/38.dab7c3ce.js",
    "revision": "a1eabfd783efc12a2db442bcb83ea2d3"
  },
  {
    "url": "assets/js/39.59791b7d.js",
    "revision": "2b652c05a5a952155339b4c87302be50"
  },
  {
    "url": "assets/js/4.16870938.js",
    "revision": "04efd8f947ae043d02c24986f4007c38"
  },
  {
    "url": "assets/js/40.e879c9e9.js",
    "revision": "586c1d17a59e1d8b06395df8e7cbb1ea"
  },
  {
    "url": "assets/js/41.d1be1730.js",
    "revision": "3f6750f9fb0ff9e67bafdb627f3b3d9d"
  },
  {
    "url": "assets/js/42.23f9683d.js",
    "revision": "e6ebc19e0fb401d8f46347d7122ecc3b"
  },
  {
    "url": "assets/js/43.38d3cdd4.js",
    "revision": "95f0212395fa3231de6912c1c48a6b95"
  },
  {
    "url": "assets/js/44.f9bf4d5c.js",
    "revision": "3131eeaf0db7a0c62ee2f3f1c1b51160"
  },
  {
    "url": "assets/js/45.57321ca7.js",
    "revision": "457eb736db60fadd38f0a62e43a7b8a8"
  },
  {
    "url": "assets/js/46.9cf3fdde.js",
    "revision": "19ae1ae7c39f89efd03c9ca5f8fe7b17"
  },
  {
    "url": "assets/js/47.9f90c067.js",
    "revision": "5bf2683b8df95a3c908ad8bea2711df1"
  },
  {
    "url": "assets/js/48.51377ddb.js",
    "revision": "a4f475d92f53e8fcca57216c2b5898f5"
  },
  {
    "url": "assets/js/49.3077da2f.js",
    "revision": "f54dbfcf361c2b5488b6a63ac750bc47"
  },
  {
    "url": "assets/js/5.f917c675.js",
    "revision": "67ad46eb5367ab6983ddb16d17a1a6fb"
  },
  {
    "url": "assets/js/50.d8b902b7.js",
    "revision": "5ea21a2052b5c9d3bed1236a72780204"
  },
  {
    "url": "assets/js/51.10d1198e.js",
    "revision": "310c0dce78485cd2c86e26294964f76d"
  },
  {
    "url": "assets/js/52.8a871a73.js",
    "revision": "e98aa4bdaab150ca5a31d79760f995ad"
  },
  {
    "url": "assets/js/53.214bf1d8.js",
    "revision": "997e3b53b1f184c596ec0f344a440e3f"
  },
  {
    "url": "assets/js/54.978b323e.js",
    "revision": "44b9d428cb7f65252bf59303b782861f"
  },
  {
    "url": "assets/js/55.b0806d73.js",
    "revision": "073c36aada63898b80d1f34129937d76"
  },
  {
    "url": "assets/js/56.d863c858.js",
    "revision": "d67eb0445251a75cc5f19fb206f96597"
  },
  {
    "url": "assets/js/57.dc8799fa.js",
    "revision": "7502d9fee84123410cdf733009dd22c1"
  },
  {
    "url": "assets/js/58.4cc66caa.js",
    "revision": "86961a51134e1a4df07c8ed63f127dfd"
  },
  {
    "url": "assets/js/59.b3ab0907.js",
    "revision": "e1d643e5031af385d450baa05d4b7f02"
  },
  {
    "url": "assets/js/6.095793f9.js",
    "revision": "83d42eef380515e582a91e2672c5165d"
  },
  {
    "url": "assets/js/60.476ead60.js",
    "revision": "1fba9bf4e38a964a3a28f39c15a102c9"
  },
  {
    "url": "assets/js/61.a74f7973.js",
    "revision": "87d0f141a3dbf80c4b294d884dde0b9a"
  },
  {
    "url": "assets/js/62.9e0492d3.js",
    "revision": "20f49b372c564998ed6e88ab933cd04f"
  },
  {
    "url": "assets/js/63.a7893898.js",
    "revision": "6b2b6fe368e95c8f627ddca008891b54"
  },
  {
    "url": "assets/js/64.75c9fba6.js",
    "revision": "7aa68b050e6bc41bad76e246ab90a64f"
  },
  {
    "url": "assets/js/65.d0a63368.js",
    "revision": "030144a30e428332c3b9c0a6a754b812"
  },
  {
    "url": "assets/js/66.71ddff64.js",
    "revision": "84c4439b3d469b571d7884c566522f4d"
  },
  {
    "url": "assets/js/67.f81a93c4.js",
    "revision": "dddfdf7b75a88e7e3aa456bffe225056"
  },
  {
    "url": "assets/js/68.f78458a5.js",
    "revision": "dc022ebe43ac709e87b732f53c51bb4c"
  },
  {
    "url": "assets/js/69.399533c1.js",
    "revision": "b676a0776485b567e73354ea5dadc92a"
  },
  {
    "url": "assets/js/7.7177754b.js",
    "revision": "f9439477ebbccbdce967040b2c1c90a1"
  },
  {
    "url": "assets/js/70.73300c46.js",
    "revision": "c04c8693528524cd0326454b83129b8b"
  },
  {
    "url": "assets/js/71.5864e6e3.js",
    "revision": "1889aa880ac3ee78ed6895828598ebca"
  },
  {
    "url": "assets/js/72.e44274eb.js",
    "revision": "424a09c277dbf699529473bfb345b23f"
  },
  {
    "url": "assets/js/73.81551254.js",
    "revision": "80df1691795f673a1009519d5c59145c"
  },
  {
    "url": "assets/js/8.d450dc5e.js",
    "revision": "389860312233300da26909857565aa52"
  },
  {
    "url": "assets/js/9.9b423162.js",
    "revision": "0ee3d732fe1731e8731dd56ae83b93c0"
  },
  {
    "url": "assets/js/app.5f83405d.js",
    "revision": "2cec49aa2f43d52702f3bed32b2653c1"
  },
  {
    "url": "assets/js/vendors~docsearch.d105db0f.js",
    "revision": "4c74d34390fac4ae1d5f52814ef966a3"
  },
  {
    "url": "avatar.jpg",
    "revision": "eeaccaf0cb8f9cefe884c3010e859ed5"
  },
  {
    "url": "avatar.png",
    "revision": "df4467759eab42a8de547f7fe386f68d"
  },
  {
    "url": "blogs/backend/092101.html",
    "revision": "e68b619717a3372ecdb5feeede0a8f23"
  },
  {
    "url": "blogs/diary/diary1.html",
    "revision": "d245f73c2ee638637670d5a6a9ed75c7"
  },
  {
    "url": "blogs/diary/diary2.html",
    "revision": "6b76d2d63d47514b445b7f4bf96b7fe1"
  },
  {
    "url": "blogs/front/2018/121501.html",
    "revision": "e35818b25c0d2ec4737e8c08a0b45b69"
  },
  {
    "url": "blogs/front/2019/092101.html",
    "revision": "57b592a99df0c2b2c1ee943407c21e07"
  },
  {
    "url": "blogs/magic/092101.html",
    "revision": "4d31ef4f33d15c156af6c01bee9ba0f9"
  },
  {
    "url": "blogs/magic/121501.html",
    "revision": "d07aa2cf978f86839b573a90494ace32"
  },
  {
    "url": "blogs/magic/basic/difference.html",
    "revision": "4a48735867d31bff9b547a3052f957db"
  },
  {
    "url": "blogs/magic/basic/prefix.html",
    "revision": "2e2b77c4b577fde87a6de289a6796c8d"
  },
  {
    "url": "blogs/magic/dp/backpack/01.html",
    "revision": "880c1057d50aa2b62b013d2c414c5bb4"
  },
  {
    "url": "blogs/magic/dp/backpack/group.html",
    "revision": "e1fe0af281c5ea3c5b40f0649ca3072c"
  },
  {
    "url": "blogs/magic/dp/backpack/multiply.html",
    "revision": "998112888838bc109bc57f08ef3941f1"
  },
  {
    "url": "blogs/magic/dp/backpack/whole.html",
    "revision": "28a983314abfec0977c35b1d8d16973a"
  },
  {
    "url": "blogs/magic/dp/interval/stone.html",
    "revision": "8052f1543c332d50394814e3c4c46584"
  },
  {
    "url": "blogs/magic/dp/linear/LCIS.html",
    "revision": "1783c72f2a249636b6f0601217f7493a"
  },
  {
    "url": "blogs/magic/dp/linear/LIS.html",
    "revision": "8ae1c91992dd6350dd8f1dd3a161b53f"
  },
  {
    "url": "blogs/magic/dp/linear/numberTri.html",
    "revision": "08948d47bd3c43d945b7258959dad8ea"
  },
  {
    "url": "blogs/other/devika.html",
    "revision": "3364a417b75044081ec63a1df70f8e84"
  },
  {
    "url": "blogs/other/guide.html",
    "revision": "23958da6ca0d316b3059de6dcbee4052"
  },
  {
    "url": "blogs/other/quotes.html",
    "revision": "778af5244bdba33313ee904788a6b2b3"
  },
  {
    "url": "categories/index.html",
    "revision": "32b3c5d0f17021b631aa175d30ec5975"
  },
  {
    "url": "categories/Linux/index.html",
    "revision": "8e528dffef732cfb70e0fd6c023292e1"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "b92623bffbba2d56c63be83b8a34936a"
  },
  {
    "url": "categories/后端/index.html",
    "revision": "a20567876f918994205d422f9c569795"
  },
  {
    "url": "categories/日记/index.html",
    "revision": "25749a84d35c9d9b24a37ec0263e89f1"
  },
  {
    "url": "categories/算法/index.html",
    "revision": "77a5f1e915ce811aea5bde5f6c49effe"
  },
  {
    "url": "categories/算法/page/2/index.html",
    "revision": "e49aa483c9c02f0304ff2ea0626e2fed"
  },
  {
    "url": "docs/index.html",
    "revision": "f8000a866827fcb352e08303f27e5351"
  },
  {
    "url": "docs/note1.html",
    "revision": "7761f73eba52219310e413ce4c7bb773"
  },
  {
    "url": "docs/note10.html",
    "revision": "4b2c6c37a522afe3802b5035bab2fcd8"
  },
  {
    "url": "docs/note11.html",
    "revision": "f77d954ff554559f102860d588da6203"
  },
  {
    "url": "docs/note12.html",
    "revision": "4434d6bb62a3c3017a74249df23e603f"
  },
  {
    "url": "docs/note2.html",
    "revision": "a316f3a13ca09495faf1115455c9a128"
  },
  {
    "url": "docs/note3.html",
    "revision": "e5d0c379c65257a073cbbeb8cd3ad1fb"
  },
  {
    "url": "docs/note4.html",
    "revision": "dd3f9ae7bfed39f7dc384f96d1acff64"
  },
  {
    "url": "docs/note5.html",
    "revision": "d04f32af524f3557b78c9a37ff46cc23"
  },
  {
    "url": "docs/note6.html",
    "revision": "383a313797b4862a563703513feeeeda"
  },
  {
    "url": "docs/note7.html",
    "revision": "f7d6b0e1823b480d4c1a26129a82943a"
  },
  {
    "url": "docs/note8.html",
    "revision": "a028ee6caf7f699761ce3736c7bfcd0e"
  },
  {
    "url": "docs/note9.html",
    "revision": "49a2ba56bdb4ed260e09eb5a0282925b"
  },
  {
    "url": "hero.png",
    "revision": "5367b9349d4e048235eeed50d9ef36df"
  },
  {
    "url": "icons/icon512_maskable.png",
    "revision": "18cdf00cfde8b3c7aab170dc17dca081"
  },
  {
    "url": "icons/icon512_rounded.png",
    "revision": "1b427f2e4f526e7f70bb2e25bf10c0d0"
  },
  {
    "url": "index.html",
    "revision": "b6316622f9537ecfe1f346d9544d8312"
  },
  {
    "url": "logo.png",
    "revision": "406370f8f120332c7a41611803a290b6"
  },
  {
    "url": "tag/github/index.html",
    "revision": "d5f1e6c10165dbabd334f87eee0ec746"
  },
  {
    "url": "tag/index.html",
    "revision": "c259b417f454c95a2c375de81f966c57"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "7f2d89c8d04f1df36530915937c1868f"
  },
  {
    "url": "tag/markdown/index.html",
    "revision": "e22c49713caafa0a4200475d5f355dd3"
  },
  {
    "url": "tag/nginx/index.html",
    "revision": "d87554c63e067f9e0b7d550981891c29"
  },
  {
    "url": "tag/vuepress/index.html",
    "revision": "d37b57a3d3a9b55951dadd2de062a1b1"
  },
  {
    "url": "tag/其他/index.html",
    "revision": "8b51a00e0f9fd7cf52786122dc19cd60"
  },
  {
    "url": "tag/前端/index.html",
    "revision": "7d0a059109c6e0bcb3cbf72712ab70af"
  },
  {
    "url": "tag/动态规划/index.html",
    "revision": "d327854921032a0b8984eeef1ac9e3b9"
  },
  {
    "url": "tag/区间DP/index.html",
    "revision": "fbc90d40fbdb83e41627919db70178d8"
  },
  {
    "url": "tag/图论/index.html",
    "revision": "4438c63c3bb92feceb6982e4649b5c5c"
  },
  {
    "url": "tag/基础算法/index.html",
    "revision": "a7fa8dc2e0b7267ee85f5801deb6af34"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "cd91955797425558f95227817b1a2f3a"
  },
  {
    "url": "tag/日记/index.html",
    "revision": "4e5103e433648934fb27d4d3b91b6b53"
  },
  {
    "url": "tag/消息队列/index.html",
    "revision": "d7c2dc4421a975b97651262f85b2476e"
  },
  {
    "url": "tag/线性DP/index.html",
    "revision": "87d912b2c9dc3a5a1f6cbb9b8b17eb59"
  },
  {
    "url": "tag/背包/index.html",
    "revision": "aded00a0b3fa4975ea4cb3ccbc771f9b"
  },
  {
    "url": "tag/项目记录/index.html",
    "revision": "b35b2c8b544eea55c12c81ea36258448"
  },
  {
    "url": "timeline/index.html",
    "revision": "3ff4476751ed5faab9a1c5afe21b0c32"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
