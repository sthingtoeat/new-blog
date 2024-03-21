#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd public

# 如果是发布到自定义域名
# echo 'blog.haruka.website' > CNAME

git init
git add -A
git config user.email "1040606497@qq.com"
git config user.name "sthingtoeat"         #部署项目时可能会问你是谁
git commit -m 'deploy'


# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:sthingtoeat/new-blog.git master:gh-pages

cd -