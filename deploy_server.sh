#此处脚本用于将构建好的dist文件上传至服务器
scp -r dist space:blog/web

ssh space "./update_blog.sh"
