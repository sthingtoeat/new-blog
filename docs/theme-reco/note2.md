---
title: 图片
date: 2024-3-8
---

## 图片引用

::: tip 提示
在vuepress中静态资源默认在.vuepress/public 中。
:::

官网的两种引用图片方式
[vuepress图片引用](https://vuepress.vuejs.org/zh/guide/assets.html#%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84)

### 方式1

**例如图片位置在.vuepress/public/assets/img**

你可以使用下面的代码,

**注意，请直接写在md文件里面**

```html
<img :src="$withBase('/我不知道.jpg')" alt="foo">
```

图片效果:

<img :src="$withBase('/assets/img/我不知道.jpg')" alt="我不知道">

### 方式2

你也可以使用下面的代码
```md
![我的钱钱没有了](/assets/img/我的钱钱没有了.jpg) 
```

它的使用有点类似于链接的引用，只不过区别在于前面的感叹号罢了

![我的钱钱没有了](/assets/img/我的钱钱没有了.jpg)

## 图片缩放插件medium-zoom

更具体的内容可看官服教程:
[medium-zoom插件的使用](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html)

### 1.安装

去你的项目根目录下执行
```sh
yarn add -D @vuepress/plugin-medium-zoom
# OR npm install -D @vuepress/plugin-medium-zoom
```

### 2.使用

**简单使用一下就可以啦**
```js
module.exports = {
  plugins: ['@vuepress/medium-zoom']
}
```
**如果需要自定义选项的话，应该这样**
```js
module.exports = {
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',//.号后面是class，如果没有类名则别写
      options: {    //这里改css样式
        margin: 16
      }
    }
  }
}
```
**测个小点的图试试看吧**

![logo](/favicon.ico)

**如果你用不了,请先检查selector里的img后面是否有类名，这就是接下去要讲的指定类缩放**

## 指定类缩放

**先假设我们的缩放插件里的内容是这样的**
```js
'@vuepress/medium-zoom': {
      selector: 'img.custom',
    },
```

如此一来，只要是没有类名的图片，都能够缩放,相当于对img这个标签进行选择,添加如下标签

```html
<img class="custom" :src="$withBase('/favicon.ico')" >
```

效果如下

<img class="custom" :src="$withBase('/favicon.ico')" >

同样作为img但是类名不是custom的另一个图
```html
<img :src="$withBase('/favicon.ico')" >
```
<img :src="$withBase('/favicon.ico')" >

是不是就无法进行缩放了？值得一提的是，如果你选择了img标签，也就是
```js
selector: 'img',
```
那么不论你的img类名是什么，只要是img这个标签，它都能进行缩放
