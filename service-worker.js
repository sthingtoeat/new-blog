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
    "revision": "4c5903c38721fbe33300c1fdcd21cb1b"
  },
  {
    "url": "assets/css/0.styles.b5220db7.css",
    "revision": "5c3d27758b51b5229184c956b5cbae1f"
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
    "url": "assets/js/1.654e6fed.js",
    "revision": "1f2b5d51d8f95436551a51e0359a89b4"
  },
  {
    "url": "assets/js/10.11be93d4.js",
    "revision": "11a13fe4c70bbfa3faa31c3a42196327"
  },
  {
    "url": "assets/js/11.c2a085b6.js",
    "revision": "afe87878b77235f3c939f229cffd0951"
  },
  {
    "url": "assets/js/14.3b293192.js",
    "revision": "1520f78b878d6917f424ff54d4ce04eb"
  },
  {
    "url": "assets/js/15.77113d0e.js",
    "revision": "3ddb2fc7a264fb7d0a1a3ec8aec45662"
  },
  {
    "url": "assets/js/16.cfa55ee1.js",
    "revision": "4e99adca4df5c943f21fc0486ae1d4d4"
  },
  {
    "url": "assets/js/17.78328155.js",
    "revision": "a715f29c1d5dc0efc44d2a0b05ef0c08"
  },
  {
    "url": "assets/js/18.b1f2822c.js",
    "revision": "61f2392e490e557b2aae6938e7bef89d"
  },
  {
    "url": "assets/js/19.75bff0f2.js",
    "revision": "fc043ecb6476e2b0104fcbd75146ef72"
  },
  {
    "url": "assets/js/2.a8e9f7e9.js",
    "revision": "5265a1b2d830dc1ca74f308c97ee4dad"
  },
  {
    "url": "assets/js/20.2a244a90.js",
    "revision": "a9b4bdddaab8de7513d4e625e8599279"
  },
  {
    "url": "assets/js/21.4f6d8631.js",
    "revision": "894e943c1b5c1559f586459c2c1b1363"
  },
  {
    "url": "assets/js/22.fca18f37.js",
    "revision": "56780891bcf8edf11714b14db41c8261"
  },
  {
    "url": "assets/js/23.7d3d49cb.js",
    "revision": "42d8f93f9f6e094d37cb7d6f80799384"
  },
  {
    "url": "assets/js/24.45c6599b.js",
    "revision": "0cf1428e497b03a704ad09228cbb2021"
  },
  {
    "url": "assets/js/25.619d33dc.js",
    "revision": "2fa3cc32991f26957b16e1fbf4a4ef0a"
  },
  {
    "url": "assets/js/26.a5adc2f4.js",
    "revision": "668cd17d06499773f69025a1335287c1"
  },
  {
    "url": "assets/js/27.420a37c9.js",
    "revision": "f99bd41c4aee2ecc6813dae4e19e5254"
  },
  {
    "url": "assets/js/28.7fea1b53.js",
    "revision": "e9efc5124519de003829554f7e97ba5b"
  },
  {
    "url": "assets/js/29.2722b492.js",
    "revision": "7228a99d94883e50972c37b49ce0ed95"
  },
  {
    "url": "assets/js/3.a2edf2a3.js",
    "revision": "69d26fc41968eb29121ab77c62023e70"
  },
  {
    "url": "assets/js/30.44618352.js",
    "revision": "14b39996c7f5a9e0cd67819676f077ce"
  },
  {
    "url": "assets/js/31.7a2b1fc2.js",
    "revision": "c6f60fbc3c6e7d656c52acfb0547c0c4"
  },
  {
    "url": "assets/js/32.30fd082e.js",
    "revision": "551c43af282f81f3639ad5531ddd389b"
  },
  {
    "url": "assets/js/33.ec3d0513.js",
    "revision": "e68dd9912c8a57460c34affa8673be33"
  },
  {
    "url": "assets/js/34.28e144a6.js",
    "revision": "e5d191585f4efd70b053a2b0daf68549"
  },
  {
    "url": "assets/js/35.d0a7fd8c.js",
    "revision": "516e14e71ba085affa903269b4b88eed"
  },
  {
    "url": "assets/js/36.54298a31.js",
    "revision": "ed680260a3a152eef64a652820ea693a"
  },
  {
    "url": "assets/js/37.77edf216.js",
    "revision": "b3a8527423f900b8aa698948c4b5f36f"
  },
  {
    "url": "assets/js/38.0a4bc737.js",
    "revision": "71ff7466d3952258a0c80a95cdb27f64"
  },
  {
    "url": "assets/js/39.59791b7d.js",
    "revision": "2b652c05a5a952155339b4c87302be50"
  },
  {
    "url": "assets/js/4.241897cc.js",
    "revision": "516faaa7636895e8ccf201e936506053"
  },
  {
    "url": "assets/js/40.6cc6ed20.js",
    "revision": "4831ea94ca03d2f135f96e4c93008a1a"
  },
  {
    "url": "assets/js/41.9290c80b.js",
    "revision": "8dd9bd58787eef308a08cbb9c795377c"
  },
  {
    "url": "assets/js/42.ce3f6a02.js",
    "revision": "2faa8372d311a91743b813d1a45923a1"
  },
  {
    "url": "assets/js/43.8cd4f442.js",
    "revision": "83a82bdb258e515599a8dd212d16ffff"
  },
  {
    "url": "assets/js/44.2958961b.js",
    "revision": "75969cc00e97286fae3c50fbd62d8201"
  },
  {
    "url": "assets/js/45.dea24fa3.js",
    "revision": "fccd357c9793a69ce1c6bae97f594adc"
  },
  {
    "url": "assets/js/46.f567d58c.js",
    "revision": "1df0abc3d8daf1093234346d1bf700c3"
  },
  {
    "url": "assets/js/47.3e71b047.js",
    "revision": "f2c189083a58ac5fedd465d8e6b35e63"
  },
  {
    "url": "assets/js/48.8b9f8531.js",
    "revision": "6cdbb54e6f1bc4f9e7b0e70ed7134207"
  },
  {
    "url": "assets/js/49.8d891c9d.js",
    "revision": "47e535ce049db283c3c917f51d4248a6"
  },
  {
    "url": "assets/js/5.6fdca4cd.js",
    "revision": "5d4060934e4c78aaae10e301d3e495e8"
  },
  {
    "url": "assets/js/50.83777dee.js",
    "revision": "33d2bae8dd244ee64022e4150455972b"
  },
  {
    "url": "assets/js/51.bbe88b95.js",
    "revision": "e0743b5ea9983f6949c148f97f947c19"
  },
  {
    "url": "assets/js/52.8a240241.js",
    "revision": "26fb9e4d0c90277ee55e4ce31b9a1c04"
  },
  {
    "url": "assets/js/53.08499a57.js",
    "revision": "7df4b55b6ab2a2e15977ad43df0cc653"
  },
  {
    "url": "assets/js/54.e6ba118a.js",
    "revision": "d1c3fc4bebc2afa5a6d39d44a3ace321"
  },
  {
    "url": "assets/js/55.0bb9bc22.js",
    "revision": "a3d041c483edc20a9f1c783a67466035"
  },
  {
    "url": "assets/js/56.3c74f006.js",
    "revision": "056332a9bfb854f00f972297a778b787"
  },
  {
    "url": "assets/js/57.d8f6a138.js",
    "revision": "026e2fa9234094502dc72fab3f0b1eb0"
  },
  {
    "url": "assets/js/58.4cfe1fb0.js",
    "revision": "7fdca1fef8220941da41e9c0d525e3ef"
  },
  {
    "url": "assets/js/6.317f0bd5.js",
    "revision": "ca4f72c9ae747b879b3bb82d1ddd6fda"
  },
  {
    "url": "assets/js/7.adc64605.js",
    "revision": "7908767ef7e166e1568fa5088cf3b08c"
  },
  {
    "url": "assets/js/8.7fb5089e.js",
    "revision": "e16c6fe9adf0d7a9fa09dcbe865908c3"
  },
  {
    "url": "assets/js/9.2f22361f.js",
    "revision": "99c75b271ab56b118eb480fec348d068"
  },
  {
    "url": "assets/js/app.b39e87cc.js",
    "revision": "7662f584ea0f706faeb4f601fcc6fffa"
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
    "url": "blogs/category1/2018/121501.html",
    "revision": "c323b4c1b16a2593b7c2dcd90128015b"
  },
  {
    "url": "blogs/category1/2019/092101.html",
    "revision": "960b69ea4bba2f5e3751ae2914151843"
  },
  {
    "url": "blogs/category2/092101.html",
    "revision": "85c33476a7bf3f4b3c672711b761eb44"
  },
  {
    "url": "blogs/diary/diary1.html",
    "revision": "13ea5f93f6ecf18ca59db46505046189"
  },
  {
    "url": "blogs/magic/092101.html",
    "revision": "22d8288c4d406df074d9958c32835c04"
  },
  {
    "url": "blogs/magic/121501.html",
    "revision": "620d549e9a7649e9b596e46471bebb4c"
  },
  {
    "url": "blogs/other/guide.html",
    "revision": "fb9b4aae64e1e56d60c02282dfeb5207"
  },
  {
    "url": "categories/index.html",
    "revision": "3595678503a2f8d470f6ae1a21f30882"
  },
  {
    "url": "categories/Linux/index.html",
    "revision": "8dd7a7efb3e33ee1481ff62aaa74b637"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "4cbc65763983d7a9634148727c41934f"
  },
  {
    "url": "categories/后端/index.html",
    "revision": "a871cde3146461cb851c65875c9e2e40"
  },
  {
    "url": "categories/日记/index.html",
    "revision": "8e3ba4668c612c482d450539763fc460"
  },
  {
    "url": "categories/算法/index.html",
    "revision": "01fa4a10ec9cb4c179231c5feee57756"
  },
  {
    "url": "docs/index.html",
    "revision": "53a10abdae6a44cc61f6fe9e6dea0e7f"
  },
  {
    "url": "docs/note1.html",
    "revision": "8669db2cc926d46054288185f7cc5e6c"
  },
  {
    "url": "docs/note10.html",
    "revision": "2deffaf0cdc4968b5bc95a836f914213"
  },
  {
    "url": "docs/note2.html",
    "revision": "9e29fd335dff32e36f82e1a8eb83077e"
  },
  {
    "url": "docs/note3.html",
    "revision": "48864762cfe163c2f19921d78b1202c7"
  },
  {
    "url": "docs/note4.html",
    "revision": "2a21b1a44f6b4834062c2d9720f54138"
  },
  {
    "url": "docs/note5.html",
    "revision": "8d72c9b5932186674345fd5a6f0f19d8"
  },
  {
    "url": "docs/note6.html",
    "revision": "e1539581901d9defa4fc4f039f2bb99f"
  },
  {
    "url": "docs/note7.html",
    "revision": "ac85e7cb028c0246088c8b61770a424a"
  },
  {
    "url": "docs/note8.html",
    "revision": "bb029cc6af0f788aa0032855f269d406"
  },
  {
    "url": "docs/note9.html",
    "revision": "743d5e1236e382cf730f18bcaab448c2"
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
    "revision": "0be0b3f4d17cc3557042c194aacb23b5"
  },
  {
    "url": "logo.png",
    "revision": "406370f8f120332c7a41611803a290b6"
  },
  {
    "url": "tag/index.html",
    "revision": "d56ada5b9de57c1c2e329c9e512dbbf8"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "b6731326a024f571a127cb12ba489437"
  },
  {
    "url": "tag/JS/index.html",
    "revision": "ae5f68012cd2c3f85d174101d856f4c3"
  },
  {
    "url": "tag/markdown/index.html",
    "revision": "b162026dbb7f9200392f48e9f6cd203d"
  },
  {
    "url": "tag/Nginx/index.html",
    "revision": "243da0b4f0841f4fa8530e8b1c9adc91"
  },
  {
    "url": "tag/vuepress/index.html",
    "revision": "c88b6e2b70e65af9aa9d48b089284a2b"
  },
  {
    "url": "tag/图论/index.html",
    "revision": "83bb9fba2fb9277dbdafa3c857dc971c"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "9553f678ccd4491486cd7a47a2041a2a"
  },
  {
    "url": "tag/日记/index.html",
    "revision": "e2feb4a2aa58213e83c8ab992e043483"
  },
  {
    "url": "timeline/index.html",
    "revision": "08170bf46bfbf0aabd5c644140fffaf6"
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
