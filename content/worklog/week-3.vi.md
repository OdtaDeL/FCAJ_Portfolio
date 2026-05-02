### Mục Tiêu Tuần 3

* Triển khai backend lên môi trường container trên AWS.
* Tích hợp hệ thống xác thực người dùng.
* Kết nối frontend với API backend.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
|------|----------|--------|------------|--------------------|
| 1 | - Cấu hình Amazon Cognito <br>&emsp; + Tạo User Pool cho đăng ký/đăng nhập <br>&emsp; + Thiết lập các thuộc tính người dùng | 23/03/2026 | 23/03/2026 | - |
| 2 | - Build Docker image backend <br>&emsp; + Đóng gói ứng dụng NestJS <br>&emsp; + Kiểm tra image local | 24/03/2026 | 24/03/2026 | - |
| 3 | - Đẩy Docker image lên Amazon ECR | 25/03/2026 | 25/03/2026 | - |
| 4 | - Triển khai ECS Service trên Fargate <br>&emsp; + Cấu hình Task Definition <br>&emsp; + Kết nối với ALB | 26/03/2026 | 26/03/2026 | - |
| 5 | - Thiết lập frontend AWS Amplify <br>&emsp; + Kết nối repository Git <br>&emsp; + Cấu hình build pipeline | 27/03/2026 | 27/03/2026 | - |
| 6 | - Cấu hình biến môi trường <br>&emsp; + Inject API URL và Cognito ID vào frontend <br>&emsp; + Đồng bộ cấu hình giữa các môi trường | 28/03/2026 | 28/03/2026 | - |
| 7 | - Kiểm tra hệ thống end-to-end <br>&emsp; + Test đăng nhập và gọi API <br>&emsp; + Xác minh luồng hoạt động toàn hệ thống | 29/03/2026 | 29/03/2026 | - |

### Kết quả đạt được Tuần 3

* Backend đã được triển khai thành công trên ECS Fargate.
* Hệ thống xác thực người dùng hoạt động ổn định với Cognito.
* Frontend có thể tương tác trực tiếp với API backend.

### Khó khăn & Bài học

* **Khó khăn:** Sai lệch biến môi trường giữa local và môi trường cloud gây lỗi xác thực.
* **Giải pháp:** Chuẩn hóa quy trình đặt tên và quản lý biến môi trường.
* **Bài học:** Việc kiểm thử end-to-end sớm giúp phát hiện lỗi tích hợp nhanh chóng.

### Kế hoạch Tuần tới

* Triển khai cơ sở dữ liệu Amazon RDS.
* Tăng cường bảo mật hệ thống và quản lý secrets.
* Thiết lập HTTPS và domain cho ứng dụng.