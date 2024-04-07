#此处脚本用于将构建好的dist文件上传至服务器
yarn build				#构建之前请确保删除了config.js中的base

rm -r dist         			#移除文件夹dist

cp -r public dist			#构建会生成public文件夹，把它改名成dist

scp -r dist space:blog/web

ssh space "./update_blog.sh"
