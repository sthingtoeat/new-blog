---
title: Node.js版本过高而报错
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