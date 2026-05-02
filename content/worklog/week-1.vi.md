

### Mục Tiêu Tuần 1

* Chốt yêu cầu chức năng và các tiêu chuẩn phi chức năng (NFR) cho ứng dụng Spendwise.
* Khởi tạo chiến lược quản lý hạ tầng bằng Terraform (S3 backend/State strategy).
* Thiết lập nền móng hạ tầng mạng cơ bản trên AWS bao gồm VPC, Security Groups, ALB và ECR.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| 1 | - Phân tích yêu cầu Spendwise <br>&emsp; + Chốt tính năng theo dõi và phân tích tài chính <br>&emsp; + Xác định các yêu cầu về tính ổn định và an toàn dữ liệu | 09/03/2026 | 09/03/2026 | |
| 2 | - Khởi tạo Terraform <br>&emsp; + Cấu hình S3 bucket làm remote backend <br>&emsp; + Thiết lập DynamoDB để lock state | 10/03/2026 | 10/03/2026 | |
| 3 | - Thiết lập **Amazon VPC** <br>&emsp; + Chia Subnet Public/Private trên nhiều Availability Zones <br>&emsp; + Cấu hình Internet Gateway cho lớp Public | 11/03/2026 | 11/03/2026 | |
| 4 | - Cấu hình Security <br>&emsp; + Thiết lập **Security Group** cho ALB, ECS và RDS <br>&emsp; + Áp dụng nguyên tắc Least Privilege | 12/03/2026 | 12/03/2026 | |
| 5 | - Khởi tạo dịch vụ tính toán <br>&emsp; + Tạo repository trên **Amazon ECR** <br>&emsp; + Cấu hình cluster **Amazon ECS** cơ bản | 13/03/2026 | 13/03/2026 | |
| 6 | - Cân bằng tải <br>&emsp; + Thiết lập **Application Load Balancer (ALB)** <br>&emsp; + Cấu hình Target Group cho backend NestJS | 14/03/2026 | 14/03/2026 | |
| 7 | - Kiểm tra hạ tầng <br>&emsp; + Verify kết nối mạng giữa các subnet <br>&emsp; + Kiểm tra khả năng đẩy image lên ECR | 15/03/2026 | 15/03/2026 | |

### Kết quả đạt được Tuần 1

* Toàn bộ thành viên đã thống nhất về kiến trúc 3-tier triển khai trên AWS Cloud.
* Hạ tầng mạng (VPC) đã sẵn sàng với các lớp bảo vệ Security Group tương ứng cho từng dịch vụ.
* Đã có kho lưu trữ image (ECR) và điểm vào hệ thống (ALB) để chuẩn bị cho việc deploy ứng dụng.

### Khó khăn & Bài học

* **Khó khăn:** 
  * Việc phân chia Subnet và cấu hình Routing cho các VPC Endpoint ban đầu khá phức tạp để đảm bảo traffic nội bộ không đi qua Internet.
* **Giải pháp:** 
  * Tham khảo tài liệu Best Practice của AWS về VPC Design và tách biệt rõ ràng lớp Public/Private.
* **Bài học:** 
  * Việc sử dụng Terraform từ ngày đầu giúp kiểm soát hạ tầng chặt chẽ và dễ dàng tái sử dụng cấu hình cho các môi trường khác nhau.

### Kế hoạch Tuần tới

* Tích hợp **Amazon Cognito** cho hệ thống đăng nhập/đăng ký.
* Thực hiện đẩy Backend image lên ECR và triển khai chính thức trên ECS Fargate.
* Kết nối Frontend Amplify với API endpoint thực tế.