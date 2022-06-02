#!bin/bash

# 先停止容器
docker rm hongrunxing-web-ssr
# 删除镜像
docker rmi hongrunxing-web-ssr

# 构建镜像
docker build -t hongrunxing-web-ssr .
# 运行容器
docker run -d -p 3000:3000 --name hongrunxing-web-ssr hongrunxing-web-ssr