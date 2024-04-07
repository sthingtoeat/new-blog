---
title: 部署vuepress项目到github pages
date: 2024-3-19
tags:
- github
categories:
- 前端
---
拥有了vuepress项目,但是没有服务器，还能部署吗？

当然可以，部署到github pages就可以啦，免费的！就是可能比较卡。

## 添加base路径

去`config.js`找个地方放下面的代码,标签类似于`head``theme`等，跟着放就好了。但是千万不要放进`themeConfig`
```js
//config.js
module.exports = {
    "base":"/new-blog/",  //base路径，你的github项目的名称
    //....                //如果你还需要部署到自己的服务器上，记得去掉这里的base然后再部署，否则会css样式丢失
}
```
然后在和`.vuepress`同一目录下面新建文件`deploy.sh`，然后设置下面的内容：
```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build                 #npm run build

# 进入生成的文件夹
cd public                     #vuepress-reco生成的文件夹名称可能为public
                              #这个路径是生成的文件夹的位置
git init
git add -A

git config user.email "1040606497@qq.com"  #改成你github的邮箱
git config user.name "sthingtoeat"         #部署项目时可能会问你是谁

git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:sthingtoeat/new-blog.git master:gh-pages
                        #你github用户名/项目名称.git ，后面不动
cd -
```
在git页面执行`sh deploy.sh`即可。

或者你打开文件管理器，双击运行`deploy.sh`。

然后刷新一下你的github页面就可以看到啦！

