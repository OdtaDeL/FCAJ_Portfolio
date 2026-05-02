# Nền tảng SpendWise

## Đề xuất triển khai SpendWiseApp trên AWS

---

### 1. Tóm tắt Dự án

Ứng dụng Quản lý Chi tiêu Cá nhân Spendwise là một web application hoàn chỉnh được xây dựng nhằm giải quyết bài toán thực tế: giúp người dùng theo dõi, phân tích và kiểm soát tình hình tài chính cá nhân một cách trực quan và hiệu quả. Ứng dụng được triển khai hoàn toàn trên môi trường AWS Cloud nhằm đảm bảo tính linh hoạt và an toàn dữ liệu.

---

### 2. Bối cảnh và Giải pháp

#### Vấn đề hiện tại
Với một ứng dụng quản lý chi tiêu, dữ liệu người dùng và độ ổn định của hệ thống là yếu tố cần được chú trọng. Nếu triển khai theo mô hình máy chủ đơn lẻ hoặc hạ tầng tự quản rời rạc, hệ thống sẽ dễ gặp các tình huống:
* **Rủi ro mất mát dữ liệu** tài chính do backup thủ công, quy trình khôi phục không nhất quán.
* **Truy cập tăng đột biến** vào đầu/cuối tháng khiến hệ thống phản hồi chậm, dễ nghẽn và gián đoạn.
* **Nâng cấp khó khăn** do phải thao tác trực tiếp trên máy chủ, dễ phát sinh sai sót cấu hình.
* **Khó giám sát tập trung** khi có sự cố, dẫn đến thời gian phát hiện và xử lý lỗi kéo dài.
* **An toàn dữ liệu thấp** do cơ chế phân quyền truy cập và kiểm soát hạ tầng chưa được chuẩn hóa.

#### SpendWise giải quyết thế nào?
Để cải thiện phần nào vấn đề Spendwise lựa chọn tiếp cận theo kiến trúc Cloud thông qua AWS Cloud:
* **Frontend hiện đại:** Sử dụng framework NextJS được lưu trữ và triển khai thông qua dịch vụ AWS Amplify.
* **Backend:** Sử dụng framework NestJS và triển khai thông qua AWS ECS Fargate.
* **Hệ thống mạng:** Triển khai trong VPC, tách lớp truy cập public/private và điều phối lưu lượng qua Application Load Balancer.

---

### 3. Kiến trúc Giải pháp

Kiến trúc đề xuất bám sát mô hình 3-tier ứng dụng trên môi trường cloud:

#### Các dịch vụ AWS
| Dịch vụ | Vai trò trong SpendWise |
|:---|:---|
| **Amazon VPC** | Mạng riêng; chia subnet public/private trên nhiều AZ. |
| **ALB** | Cân bằng tải và chuyển traffic tới backend trên ECS. |
| **Amazon ECS** | Chạy container backend NestJS; không quản lý EC2. |
| **Amazon RDS** | CSDL quan hệ cho dữ liệu chi tiêu; đặt trong mạng private. |
| **AWS Amplify** | Build và host frontend Next.js từ Git. |
| **Amazon Cognito** | Quản lý đăng ký, đăng nhập và xác nhận người dùng. |
| **AWS WAF** | Lớp bảo vệ web trước các request độc hại phổ biến. |

#### Thiết kế kỹ thuật đặc thù
* **VPC Endpoint:** Kết nối nội bộ tới ECR, CloudWatch, Cognito mà không cần qua NAT.
* **Bastion Host:** Sử dụng Amazon EC2 để truy cập và vận hành DB an toàn.
* **Secrets Manager:** Lưu trữ và quản lý an toàn mật khẩu DB và các secret key.

---

### 4. Triển khai Kỹ thuật

#### Công nghệ sử dụng
* **Frontend:** NextJS, AWS Amplify.
* **Backend:** NestJS, AWS ECS Fargate, ECR.
* **Hạ tầng:** Terraform (đề xuất) để quản lý cấu hình VPC, SG, ALB.

#### Lộ trình phát triển
Dự án tập trung vào việc dựng nền tảng mạng và danh tính trước, sau đó triển khai ứng dụng và ổn định hóa dữ liệu.

---

### 5. Lịch trình & Cột mốc (Timeline)

* **Tuần 1 - Foundation:** Chốt yêu cầu, khởi tạo Terraform, dựng VPC, SG, ALB, ECR, ECS cơ bản.
* **Tuần 2 - Identity & App Deployment:** Tích hợp Cognito, đẩy image lên ECR và rollout ECS, kết nối Amplify.
* **Tuần 3 - Data & Hardening:** Bật RDS và migration dữ liệu, kiểm tra private networking, thiết lập HTTPS.
* **Tuần 4 - Stabilization & Handover:** Kiểm thử hiệu năng, thiết lập giám sát, đánh giá chi phí và tối ưu.

---

### 6. Đánh giá Rủi ro & Xử lý

| Rủi ro | Cách xử lý |
|:---|:---|
| **Chi phí NAT/ALB tăng nhanh** | Đặt budget alarm, review cost theo tuần, right-size tài nguyên. |
| **Sai lệch cấu hình env** | Chuẩn hóa biến môi trường, checklist release bắt buộc. |
| **Rủi ro vận hành DB** | Migration có kiểm soát, test restore định kỳ, giám sát connection. |
| **Bảo mật hạ tầng** | Áp dụng nguyên tắc least privilege, review SG/IAM định kỳ. |

---

### 7. Ngân sách (Ước tính tháng)

* **Tổng chi phí AWS:** $69 - $326.
* **Thành phần chính:**
    * **ALB:** $18 - $35.
    * **ECS Fargate:** $9 - $25.
    * **RDS PostgreSQL:** $12 - $35.
    * **VPC Endpoints:** $20 - $70.

---

### 8. Bước Tiếp Theo

* **Kiểm soát chi phí:** Tạm tắt Bastion và Custom domain ở giai đoạn đầu để giảm chi phí cố định.
* **Tối ưu DB:** Chỉ duy trì 1 RDS duy nhất (Single-AZ, cấu hình nhỏ).
* **Giám sát:** Thiết lập retention log CloudWatch hợp lý để tránh phát sinh phí lưu trữ.

---

### 9. Kết quả Kỳ vọng

* **Hiệu suất:** Thời gian đăng món ăn giảm từ 3 phút xuống còn 10 giây nhờ AI.
* **Độ chính xác:** Đạt 95% độ chính xác cho các món ăn Việt Nam nhờ mô hình Vision AI tiên tiến.
* **Khả năng mở rộng:** Sẵn sàng chịu tải 10.000+ người dùng với chi phí duy trì gần như bằng 0 khi idle.

---

### 10. Chiến lược Phục hồi

* **Triển khai tự động:** Sử dụng quy trình image/deploy chuẩn hóa để giảm thiểu sai sót cấu hình.
* **Phục hồi dữ liệu:** Sử dụng cơ chế backup của RDS để đảm bảo khả năng khôi phục khi gặp sự cố.
* **Giám sát sự cố:** Sử dụng CloudWatch để phát hiện và xử lý lỗi nhanh chóng, rút ngắn thời gian gián đoạn.