#!/bin/bash

# Script để build và chạy MongoDB Docker container

echo "🔨 Building Docker image..."
docker build -t pandadict /home/tuanvu17/mydocuments/myproject26/PandaDict-Project/database

echo "🚀 Running Docker container..."
docker run -d \
  --name pandadict \
  -p 27017:27017 \
  -v pandadict-data:/data/db \
  pandadict

echo "✅ MongoDB container 'pandadict' đã được khởi động!"
echo "📊 Kiểm tra trạng thái: docker ps"
echo "📝 Xem logs: docker logs pandadict"
