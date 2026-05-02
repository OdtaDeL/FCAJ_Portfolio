
### Mục Tiêu Tuần 3

* Triển khai cơ sở dữ liệu **Amazon RDS (PostgreSQL)** trong mạng riêng (Private Subnet).
* Thực hiện bảo mật hạ tầng và quản lý bí mật qua Secrets Manager.
* Thiết lập HTTPS và tên miền tùy chỉnh (Custom Domain) qua Route 53 và ACM.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| 1 | - Khởi tạo **Amazon RDS (PostgreSQL)** (Single-AZ cấu hình nhỏ) | 23/03/2026 | 23/03/2026 | - |
| 2 | - Chạy migration schema dữ liệu từ ECS Service tới RDS | 24/03/2026 | 24/03/2026 | - |
| 3 | - Cấu hình **S3 Gateway Endpoint** để truy cập nội bộ | 25/03/2026 | 25/03/2026 | - |
| 4 | - Lưu trữ thông tin DB và token an toàn vào **AWS Secrets Manager** | 26/03/2026 | 26/03/2026 | - |
| 5 | - Đăng ký SSL Certificate qua ACM và gắn vào Load Balancer | 27/03/2026 | 27/03/2026 | - |
| 6 | - Ánh xạ custom domain qua Route 53 tới ALB và Amplify | 28/03/2026 | 28/03/2026 | - |
| 7 | - Kiểm toán bảo mật mạng và đóng các cổng (ports) không cần thiết | 29/03/2026 | 29/03/2026 | - |

### Kết quả đạt được Tuần 3

* Cơ sở dữ liệu Spendwise đã hoạt động ổn định và an toàn trong mạng Private.
* Hệ thống đạt chuẩn HTTPS, đảm bảo an toàn thông tin tài chính người dùng trên đường truyền.
* Quản lý thông tin nhạy cảm tập trung, loại bỏ hoàn toàn mật khẩu hardcode trong mã nguồn.

### Khó khăn & Bài học

* **Khó khăn:** Quản lý kết nối (Connection pooling) từ Fargate tới RDS để tránh làm cạn kiệt tài nguyên DB.
* **Giải pháp:** Thực hiện migration có kiểm soát và thiết lập giám sát kết nối liên tục.
* **Bài học:** Secrets Manager là công cụ bắt buộc để bảo mật hạ tầng chuyên nghiệp.

### Kế hoạch Tuần tới

* Kiểm thử hiệu năng và độ ổn định hệ thống.
* Thiết lập bảng theo dõi giám sát và cảnh báo chi phí AWS.