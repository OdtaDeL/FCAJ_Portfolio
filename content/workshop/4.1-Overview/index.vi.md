## Tổng quan

Workshop này được thiết kế để hướng dẫn bạn quy trình xây dựng và triển khai **SpendWise** — một nền tảng quản lý tài chính cá nhân hiện đại kết hợp sức mạnh của **Terraform**, **Amazon ECS Fargate**, và **Amazon RDS**[cite: 1, 2]. Dựa trên 100% mã nguồn thực tế, workshop này sẽ giúp bạn làm chủ kiến trúc đám mây 3 lớp (3-tier) bảo mật và khám phá cách quản lý dữ liệu tài chính tối ưu với hạ tầng hiệu năng cao[cite: 1].

## Bạn sẽ học được gì

- Thiết kế và triển khai một ứng dụng AWS full-stack sử dụng các dịch vụ đám mây hiện đại[cite: 1].
- Triển khai Hạ tầng dưới dạng mã (IaC) với **Terraform** để đảm bảo tính nhất quán khi triển khai[cite: 1].
- Thiết lập hệ thống xác thực tập trung với **Amazon Cognito**[cite: 2].
- Xây dựng và container hóa backend **NestJS** để triển khai trên **ECS Fargate**[cite: 2].
- Quản lý an toàn dữ liệu quan hệ bằng **Amazon RDS (PostgreSQL)** trong các subnet riêng tư (private subnet)[cite: 3].
- Bảo vệ ứng dụng web khỏi các lỗ hổng phổ biến bằng **AWS WAF**[cite: 5].
- Thiết lập giám sát vận hành với **CloudWatch** và quản lý chi phí đám mây hiệu quả[cite: 4, 7].

## Yêu cầu

- Tài khoản AWS với quyền quản trị (Administrator access).
- Kiến thức cơ bản về các dịch vụ AWS và điện toán đám mây.
- Kinh nghiệm phát triển **NextJS** (Frontend) và **NestJS** (Backend)[cite: 1, 2].
- Hiểu biết về container hóa và Docker.
- Làm quen với các khái niệm Terraform và Hạ tầng dưới dạng mã (IaC)[cite: 1].

## Nội dung

## Giới thiệu
Workshop này được thiết kế để hướng dẫn bạn quy trình xây dựng và triển khai **SpendWise** — một nền tảng theo dõi tài chính hiện đại kết hợp giữa **AWS Amplify**, **Amazon ECS Fargate**, và **Amazon RDS**[cite: 1, 2, 3]. Bằng cách làm theo hướng dẫn này, bạn sẽ nắm vững việc triển khai các lớp mạng bảo mật và quản lý hạ tầng tự động, những yếu tố thiết yếu cho các ứng dụng tài chính[cite: 1, 3].

## Kiến trúc Tổng thể



## Tóm tắt Hạ tầng

Dưới đây là các thành phần chính mà bạn sẽ triển khai xuyên suốt Workshop:

### 1. Cơ sở dữ liệu (Amazon RDS PostgreSQL)
Cơ sở dữ liệu được đặt trong Private Subnet để đảm bảo dữ liệu tài chính không bao giờ bị tiếp xúc trực tiếp với internet[cite: 3].

| Tên bảng | Chức năng chính | Ghi chú |
| :--- | :--- | :--- |
| **`Users`** | Quản lý định danh | Lưu trữ hồ sơ người dùng được đồng bộ qua Cognito[cite: 5]. |
| **`Transactions`** | Bản ghi tài chính | Theo dõi thu nhập và chi phí theo danh mục[cite: 1]. |
| **`Budgets`** | Lập kế hoạch tài chính | Lưu trữ hạn mức và mục tiêu theo dõi do người dùng thiết lập[cite: 1]. |
| **`Categories`** | Phân loại | Các danh mục chi phí của hệ thống và người dùng tự định nghĩa[cite: 1]. |

### 2. Lớp Logic & Tính toán
1. **`ECS Fargate (NestJS)`**: Nhân backend cốt lõi xử lý logic nghiệp vụ và các yêu cầu API[cite: 2].
2. **`AWS Lambda`**: Xử lý các trigger sau khi xác nhận (post-confirmation) để đồng bộ người dùng Cognito với cơ sở dữ liệu RDS[cite: 5].
3. **`Application Load Balancer (ALB)`**: Phân phối lưu lượng truy cập đến backend ECS và xử lý kết thúc SSL (HTTPS)[cite: 1, 3].
4. **`Bastion Host`**: Cung cấp một "jump box" bảo mật cho quản trị viên để quản lý thực thể RDS trong mạng riêng[cite: 5].

### 3. Các tính năng chính & Bảo mật
* **Hạ tầng dưới dạng mã (IaC)**: 100% môi trường được quản lý qua **Terraform** để đảm bảo độ tin cậy[cite: 1].
* **Quản lý bí mật**: Các thông tin xác thực nhạy cảm được mã hóa và lưu trữ trong **AWS Secrets Manager**[cite: 3].
* **Bảo mật mạng**: Thiết kế VPC nghiêm ngặt với các subnet Public/Private và sự bảo vệ từ **AWS WAF**[cite: 1, 5].
* **Quản trị chi phí**: Hệ thống cảnh báo ngân sách (**Budget Alarms**) tự động để ngăn ngừa việc tăng chi phí AWS ngoài ý muốn[cite: 4].

---

[Tiếp tục đến 4.2 Điều kiện tiên quyết](../4.2-Prerequiste/)

## Kết luận

Bằng cách hiểu rõ kiến trúc tổng thể và các thành phần của SpendWise, bạn đã sẵn sàng để bắt tay vào triển khai thực tế. Tổng quan này cung cấp nền tảng để hiểu cách mỗi dịch vụ AWS tích hợp với nhau nhằm tạo ra một nền tảng tài chính toàn diện, có khả năng mở rộng và bảo mật cao[cite: 1, 8].