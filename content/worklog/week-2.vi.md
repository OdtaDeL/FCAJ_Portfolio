### Mục Tiêu Tuần 2

* Khởi tạo hạ tầng bằng Terraform.
* Thiết lập hệ thống mạng cơ bản trên AWS.
* Chuẩn bị nền tảng cho việc triển khai ứng dụng.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
|------|----------|--------|------------|--------------------|
| 1 | - Khởi tạo Terraform <br>&emsp; + Cấu hình S3 bucket làm remote backend <br>&emsp; + Thiết lập DynamoDB để lock state | 16/03/2026 | 16/03/2026 | - |
| 2 | - Thiết lập Amazon VPC <br>&emsp; + Chia Subnet Public/Private trên nhiều Availability Zones <br>&emsp; + Cấu hình Internet Gateway cho lớp Public | 17/03/2026 | 17/03/2026 | - |
| 3 | - Cấu hình Security <br>&emsp; + Thiết lập Security Group cho ALB, ECS và RDS <br>&emsp; + Áp dụng nguyên tắc Least Privilege | 18/03/2026 | 18/03/2026 | - |
| 4 | - Khởi tạo dịch vụ container <br>&emsp; + Tạo repository trên Amazon ECR <br>&emsp; + Cấu hình ECS Cluster cơ bản | 19/03/2026 | 19/03/2026 | - |
| 5 | - Cân bằng tải <br>&emsp; + Thiết lập Application Load Balancer (ALB) <br>&emsp; + Cấu hình Target Group cho backend | 20/03/2026 | 20/03/2026 | - |
| 6 | - Thiết lập VPC Endpoints <br>&emsp; + Interface Endpoint cho ECR và CloudWatch <br>&emsp; + Đảm bảo traffic nội bộ không qua Internet | 21/03/2026 | 21/03/2026 | - |
| 7 | - Kiểm tra hạ tầng <br>&emsp; + Verify kết nối giữa các subnet <br>&emsp; + Kiểm tra truy cập nội bộ qua VPC Endpoint | 22/03/2026 | 22/03/2026 | - |

### Kết quả đạt được Tuần 2

* Hạ tầng mạng (VPC) được thiết lập hoàn chỉnh với các lớp Public/Private rõ ràng.
* Terraform được sử dụng để quản lý toàn bộ cấu hình hạ tầng.
* Các thành phần nền tảng như ECR, ECS và ALB đã sẵn sàng cho việc deploy ứng dụng.

### Khó khăn & Bài học

* **Khó khăn:** Việc thiết kế VPC và cấu hình routing ban đầu khá phức tạp.
* **Giải pháp:** Tham khảo tài liệu Best Practice của AWS và kiểm tra từng bước triển khai.
* **Bài học:** Việc thiết kế hạ tầng đúng ngay từ đầu giúp giảm thiểu rủi ro khi mở rộng hệ thống.

### Kế hoạch Tuần tới

* Triển khai backend lên ECS Fargate.
* Tích hợp hệ thống xác thực người dùng với Amazon Cognito.
* Kết nối frontend với API backend.