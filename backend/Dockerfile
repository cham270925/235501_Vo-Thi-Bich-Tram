# Sử dụng base image Node.js gọn nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Copy các file định nghĩa dependencies trước để tận dụng Docker cache
COPY package*.json ./

# Cài đặt các thư viện cần thiết cho production
RUN npm install --production

# Copy toàn bộ mã nguồn backend vào container
COPY . .

# Khai báo port backend lắng nghe (mặc định là 5000)
EXPOSE 5000

# Lệnh khởi chạy server
CMD ["node", "server.js"]