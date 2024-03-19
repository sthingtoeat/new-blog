---
title: Node.js、npm、yarn网络问题
date: 2024-3-16
tags:
- vuepress
categories:
- 前端
---
## 解决build时因Node.js版本过高引起的报错

找到项目中的package.json文件，把`dev`和`build`修改成以下内容。其实就是在指令`vuepress xxx`的前面加上了`set NODE_OPTIONS=--openssl-legacy-provider &&`。
```js
//package.json
"scripts": {
    "dev": "vuepress dev . --open --host \"localhost\"",
    "build": "set NODE_OPTIONS=--openssl-legacy-provider && vuepress build ."
},
```

## npm、yarn网络问题

首先更换各自镜像源

```sh
#设置淘宝镜像源
npm config set registry https://registry.npmmirror.com
#检查是否设置成功
npm get registry  

#设置淘宝镜像源
yarn config set registry https://registry.npmmirror.com
#检查是否设置成功
yarn config get registry   

```

依然有问题，那么将自己的网络设置，取消ipv6协议即可。
具体方式请参考[这里](https://blog.csdn.net/m0_63230155/article/details/131786214)