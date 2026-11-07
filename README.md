
- MSSV: 235501
- Họ tên: Vo Thi Bich Tram
- Học phần: Điện toán đám mây

Xây dựng hệ thống quản lý thiết bị phòng học trên nền tảng đám mây.
Hệ thống hỗ trợ thêm, xem, cập nhật, xóa và tìm kiếm thiết bị.
Đồng thời theo dõi tình trạng sử dụng của từng thiết bị.

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Quản lý mã nguồn: Git, GitHub
- Đóng gói: Docker
- Lưu trữ Image: Docker Hub
- Triển khai: Render


235501_VoThiBichTram/
- frontend/
- backend/
- README.md
- .gitignore

- Xem danh sách thiết bị
- Xem chi tiết thiết bị
- Thêm thiết bị
- Cập nhật thiết bị
- Xóa thiết bị
- Tìm kiếm thiết bị
- Theo dõi tình trạng thiết bị

Các hướng dẫn cài đặt và chạy chương trình
sẽ được cập nhật sau khi hoàn thành frontend
và backend.

## 5. Đóng gói backend bằng Docker
### Hướng dẫn chạy Backend bằng Docker:
1. **Pull image từ Docker Hub:**
   ```bash
   docker pull chamcham27/backend:latest
   ```
2. **Khởi chạy container:**
   ```bash
   docker run -d -p 5000:5000 \
     --name devicecare-backend \
     -e PORT=5000 \
     -e MONGODB_URI="<your_mongodb_atlas_connection_string>" \
     chamcham27/backend:latest
   ```
3. **Kiểm tra trạng thái:**
   Truy cập: `http://localhost:5000/health`

## 6. Đóng gói frontend bằng Docker
### Hướng dẫn chạy Frontend bằng Docker:
1. **Pull image từ Docker Hub:**
   ```bash
   docker pull chamcham27/frontend:latest
   ```
2. **Khởi chạy container:**
   ```bash
   docker run -d -p 3000:80 \
     --name devicecare-frontend \
     chamcham27/frontend:latest
   ```
3. **Truy cập ứng dụng:**
   Mở trình duyệt tại: `http://localhost:3000`

## 7. Triển khai Frontend trên Render
### Hướng dẫn triển khai Frontend (Static Site / Web Service):
1. Đăng nhập vào Render (https://dashboard.render.com).
2. Nhấn **New +** -> **Static Site** (hoặc Web Service).
3. Kết nối repository GitHub: `https://github.com/cham270925/235501_Vo-Thi-Bich-Tram`.
4. Cấu hình dịch vụ:
   - **Name**: `web-235501`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Thiết lập biến môi trường (Environment Variables):
   - `VITE_API_URL`: `https://api-235501.onrender.com`
6. Nhấn **Create Static Site** và chờ quá trình triển khai hoàn tất.
7. URL công khai Frontend: `https://web-235501.onrender.com`

## 8. Triển khai Backend API trên Render
### Hướng dẫn triển khai Backend (Web Service):
1. Đăng nhập vào Render (https://dashboard.render.com).
2. Nhấn **New +** -> **Web Service**.
3. Kết nối repository GitHub: `https://github.com/cham270925/235501_Vo-Thi-Bich-Tram`.
4. Cấu hình dịch vụ:
   - **Name**: `api-235501`
   - **Region**: `Singapore`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Health Check Path**: `/health`
5. Thiết lập biến môi trường (Environment Variables):
   - `PORT`: `5000`
   - `MONGODB_URI`: `<chuỗi kết nối MongoDB Atlas>`
6. Nhấn **Create Web Service** và lấy URL công khai.
7. Endpoint kiểm tra hoạt động: `https://api-235501.onrender.com/health`
8. Endpoint quản lý thiết bị: `https://api-235501.onrender.com/api/devices`

## 9. Danh sách liên kết nộp bài
- GitHub: https://github.com/cham270925/235501_Vo-Thi-Bich-Tram
- Docker Hub Backend: https://hub.docker.com/r/chamcham27/backend
- Docker Hub Frontend: https://hub.docker.com/r/chamcham27/frontend
- Render Frontend: https://web-235501.onrender.com
- Render Backend: https://api-235501.onrender.com
