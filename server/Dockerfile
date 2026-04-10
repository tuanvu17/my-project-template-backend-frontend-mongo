
# Sử dụng một base image Node.js phù hợp
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Set environment variables (nếu cần)
ENV NODE_ENV=production

# Expose port để truy cập vào ứng dụng
EXPOSE 3000

# Command để khởi động ứng dụng
CMD ["npm", "start"]

