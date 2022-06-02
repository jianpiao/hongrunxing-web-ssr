# 制定node镜像的版本
FROM node:14
# 移动当前目录下面的文件到app目录下
ADD . /app/
# 进入到app目录下面，类似cd
WORKDIR /app
# 安装依赖
RUN yarn install
# 打包
RUN yarn build
# 添加pm2
RUN npm install pm2 -g
# 对外暴露的端口，这里的3010需要和inde.js监听的端口一致
EXPOSE 3000
# 程序启动脚本，意思为 执行 npm start
CMD ["pm2-runtime","start", "ecosystem.config.js"]
# CMD ["yarn", "start"]