#!/bin/bash

# 部署参数
SERVER_USER="debian"        # 服务器用户名
SERVER_HOST="222.190.118.45"        # 服务器地址/IP
DEPLOY_DIR="/home/opt/data/nginx/html/"   # 部署路径
BUILD_DIR="dataman"               # Vite 构建生成的目录

echo "开始构建项目..."
pnpm install
pnpm build

echo "上传文件到服务器..."
rsync -avz --delete $BUILD_DIR/ $SERVER_USER@$SERVER_HOST:$DEPLOY_DIR/

echo "部署完成！"