### Mục Tiêu Tuần 4

* Triển khai cơ sở dữ liệu trên AWS.
* Bảo mật thông tin nhạy cảm của hệ thống.
* Thiết lập HTTPS và domain cho ứng dụng.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
|------|----------|--------|------------|--------------------|
| 1 | - Khởi tạo Amazon RDS (PostgreSQL) <br>&emsp; + Triển khai trong Private Subnet <br>&emsp; + Cấu hình instance phù hợp | 30/03/2026 | 30/03/2026 | - |
| 2 | - Thực hiện migration dữ liệu <br>&emsp; + Kết nối từ ECS Service tới RDS <br>&emsp; + Áp dụng schema database | 31/03/2026 | 31/03/2026 | - |
| 3 | - Thiết lập AWS Secrets Manager <br>&emsp; + Lưu trữ thông tin database <br>&emsp; + Loại bỏ hardcode credentials | 01/04/2026 | 01/04/2026 | - |
| 4 | - Cấu hình VPC Endpoint <br>&emsp; + Gateway Endpoint cho S3 <br>&emsp; + Tối ưu truy cập nội bộ | 02/04/2026 | 02/04/2026 | - |
| 5 | - Thiết lập HTTPS <br>&emsp; + Đăng ký SSL Certificate qua ACM <br>&emsp; + Gắn certificate vào ALB | 03/04/2026 | 03/04/2026 | - |
| 6 | - Cấu hình domain <br>&emsp; + Mapping domain qua Route 53 <br>&emsp; + Kết nối tới ALB và Amplify | 04/04/2026 | 04/04/2026 | - |
| 7 | - Kiểm toán bảo mật <br>&emsp; + Đóng các port không cần thiết <br>&emsp; + Kiểm tra Security Group | 05/04/2026 | 05/04/2026 | - |

### Kết quả đạt được Tuần 4

* Cơ sở dữ liệu hoạt động ổn định trong môi trường Private.
* Thông tin nhạy cảm được quản lý an toàn thông qua Secrets Manager.
* Hệ thống đã hỗ trợ HTTPS và domain riêng.

### Khó khăn & Bài học

* **Khó khăn:** Quản lý kết nối từ ECS tới RDS để tránh quá tải database.
* **Giải pháp:** Kiểm soát số lượng kết nối và theo dõi tài nguyên DB.
* **Bài học:** Việc bảo mật dữ liệu cần được thực hiện ngay từ giai đoạn đầu.

### Kế hoạch Tuần tới

* Thiết lập hệ thống giám sát với CloudWatch.
* Thực hiện kiểm thử hiệu năng hệ thống.
* Cấu hình cảnh báo chi phí AWS.