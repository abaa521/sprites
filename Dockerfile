# 使用官方 Nginx Alpine 镜像
FROM nginx:alpine

# 设置工作目录
WORKDIR /app

# 复制所有静态资源到 Nginx 的默认目录
COPY sprites/ /usr/share/nginx/html/sprites/

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口 3015
EXPOSE 3015

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
