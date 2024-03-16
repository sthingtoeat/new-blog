---
title: 自动侧边栏
date: 2024-3-10
---

# vuepress auto sidebar插件

vuepress自带的侧边栏其实也能用，但是这个插件还能对侧边栏进行排序

[插件介绍](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/)

## 安装

使用如下命令进行安装
```sh
npm i vuepress-plugin-auto-sidebar -D
```

然后在pluginsConfig里面添加
```js
"vuepress-plugin-auto-sidebar":{},
```

接下来删去config.js里面有关sidebar的配置即可，这个插件也能配置nav导航栏，不过具体的还是去看这个插件的介绍吧，这里就不使用了

## 侧边栏标题规则
[侧边栏标题](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#title-%E6%A0%87%E9%A2%98)


## 排序规则

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        // 更多选项: 
        // `asc`、`desc`、`created_time_asc`、`created_time_desc`
        mode: "asc"
      }
    }
  }
}
```

更具体的请参考：

[排序](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#sort-%E6%8E%92%E5%BA%8F)