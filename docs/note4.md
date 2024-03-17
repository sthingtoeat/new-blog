---
title: Markdown的一部分语法
date: 2024-3-8
tags: 
- markdown
---

## 语法高亮

vuepress已经具备了Prism,你可以这样来使用
[vuepress中使用Prism](https://vuepress.vuejs.org/zh/guide/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD%E7%9A%84%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE)

引用代码块的时候
在```后面加上对应的语言类型即可

**输入**
~~~
```js
export default {
  name: 'MyComponent',
  // ...
}
```
~~~

**输出**
```js
export default {
  name: 'MyComponent',
  // ...
}
```

## 提示标签

输入
```md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: danger STOP
危险区域，禁止通行
:::

```

输出

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: danger STOP
危险区域，禁止通行
:::

## emoji

例如，在md文件里面这样输入

```md
haruka已经超神了 :tada: ！
```
输出

haruka已经超神了 :tada: ！
```md
:tada:                  # 这个就是emoji
```

更多表情请参考这个[emoji](https://www.webfx.com/tools/emoji-cheat-sheet/)

## 目录

请在md文件里面输入这个
```
[[toc]]
```
效果如下

[[toc]]

## 收缩/展开
像这样输即可
~~~
::: details
这是一个 details 标签
:::
~~~
~~~
::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::
~~~

效果：
::: details
这是一个 details 标签
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::

