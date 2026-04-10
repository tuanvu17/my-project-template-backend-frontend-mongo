# Dockerfile
FROM mongo:latest

# Thiết lập biến môi trường cho MongoDB
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=pwdroot
ENV AUTH=yes

# Copy file script init-mongo.js vào thư mục khởi tạo của MongoDB
COPY init-mongo.js /docker-entrypoint-initdb.d/
