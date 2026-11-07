# Đề tài: Quản lý thiết bị phòng học trên nền tảng đám mây

## 1. Thông tin sinh viên
- **MSSV**: 235501
- **Họ tên**: Võ Thị Bích Trâm
- **Học phần**: Điện toán đám mây

## 2. Mô tả đề tài
Xây dựng hệ thống quản lý thiết bị phòng học trên nền tảng đám mây.
Hệ thống hỗ trợ thêm, xem, cập nhật, xóa và tìm kiếm thiết bị.
Đồng thời theo dõi tình trạng sử dụng của từng thiết bị.

## 3. Công nghệ sử dụng
- **Frontend**: React (Vite)
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Quản lý mã nguồn**: Git, GitHub
- **Đóng gói**: Docker
- **Lưu trữ Image**: Docker Hub
- **Triển khai**: Render

## 4. Cấu trúc dự án
```
235501_VoThiBichTram/
├── frontend/             # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx       # Component chính
│   │   ├── App.css       # Styles
│   │   ├── index.css     # Global styles
│   │   └── main.jsx      # Entry point
│   ├── Dockerfile        # Dockerfile frontend (multi-stage: Node + Nginx)
│   ├── nginx.conf        # Cấu hình Nginx cho SPA
│   ├── .dockerignore
│   └── package.json
├── backend/              # Node.js + Express backend
│   ├── config/
│   │   └── db.js         # Kết nối MongoDB Atlas
│   ├── models/
│   │   └── Device.js     # Schema thiết bị
│   ├── routes/
│   │   └── deviceRoutes.js  # API routes CRUD
│   ├── server.js         # Entry point
│   ├── Dockerfile        # Dockerfile backend (Node Alpine)
│   ├── .dockerignore
│   └── package.json
├── render.yaml           # Cấu hình triển khai Render
├── README.md
└── .gitignore
```

## 5. Chức năng
- Xem danh sách thiết bị
- Xem chi tiết thiết bị
- Thêm thiết bị mới
- Cập nhật thông tin thiết bị
- Xóa thiết bị
- Tìm kiếm thiết bị theo từ khóa
- Theo dõi tình trạng thiết bị (Đang sử dụng, Đang bảo trì, Hư hỏng, Ngừng sử dụng)

## 6. Hướng dẫn cài đặt và chạy chương trình

### 6.1. Chạy trực tiếp (Development)
```bash
# Backend
cd backend
npm install
npm start

# Frontend (terminal khác)
cd frontend
npm install
npm run dev
```

### 6.2. Chạy Backend bằng Docker
```bash
# Pull image từ Docker Hub
docker pull chamcham27/backend:latest

# Khởi chạy container
docker run -d -p 5000:5000 \
  --name devicecare-backend \
  -e PORT=5000 \
  -e MONGODB_URI="<your_mongodb_atlas_connection_string>" \
  chamcham27/backend:latest

# Kiểm tra trạng thái
curl http://localhost:5000/health
```

### 6.3. Chạy Frontend bằng Docker
```bash
# Pull image từ Docker Hub
docker pull chamcham27/frontend:latest

# Khởi chạy container
docker run -d -p 3000:80 \
  --name devicecare-frontend \
  chamcham27/frontend:latest

# Truy cập ứng dụng
# Mở trình duyệt tại: http://localhost:3000
```

## 7. Triển khai Frontend trên Render
### Hướng dẫn triển khai Frontend (Static Site):
1. Đăng nhập vào Render (https://dashboard.render.com).
2. Nhấn **New +** -> **Static Site**.
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

## 9. Thông tin nộp bài
| STT | Nội dung | Đường dẫn |
|-----|----------|-----------|
| 1 | GitHub Repository | https://github.com/cham270925/235501_Vo-Thi-Bich-Tram |
| 2 | Docker Hub Backend | https://hub.docker.com/r/chamcham27/backend |
| 3 | Docker Hub Frontend | https://hub.docker.com/r/chamcham27/frontend |
| 4 | Render Frontend | https://web-235501.onrender.com |
| 5 | Render Backend API | https://api-235501.onrender.com |
