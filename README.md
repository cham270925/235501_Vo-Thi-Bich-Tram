
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

## 7. Triển khai
- GitHub: https://github.com/cham270925/235501_Vo-Thi-Bich-Tram
- Docker Hub Backend: https://hub.docker.com/r/chamcham27/backend
- Docker Hub Frontend: Chưa triển khai
- Render Frontend: Chưa triển khai
- Render Backend: Chưa triển khai
