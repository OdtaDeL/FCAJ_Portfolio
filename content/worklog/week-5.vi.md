
### Mục Tiêu Tuần 5

* Triển khai **AWS WAF** bảo vệ ứng dụng khỏi các lỗ hổng web phổ biến.
* Thiết lập **Bastion Host** (EC2) để truy cập quản trị DB an toàn từ xa.
* Tự động hóa đồng bộ dữ liệu người dùng thông qua AWS Lambda.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| 1 | - Khởi tạo AWS WAF Web ACL và gắn vào ALB của hệ thống | 06/04/2026 | 06/04/2026 | - |
| 2 | - Cấu hình WAF Rules cho SQLi, XSS và giới hạn Rate Limit | 07/04/2026 | 07/04/2026 | - |
| 3 | - Triển khai EC2 Bastion host nhỏ phục vụ port forwarding tới DB | 08/04/2026 | 08/04/2026 | - |
| 4 | - Triển khai **AWS Lambda** (PostConfirmation) để đồng bộ Cognito-RDS | 09/04/2026 | 09/04/2026 | - |
| 5 | - Kiểm toán bảo mật Bastion và giới hạn dải IP truy cập | 10/04/2026 | 10/04/2026 | - |
| 6 | - Kiểm thử đăng ký người dùng mới và verify tính nhất quán dữ liệu | 11/04/2026 | 11/04/2026 | - |
| 7 | - Review log truy cập WAF và hiệu quả chặn request độc hại | 12/04/2026 | 12/04/2026 | - |

### Kết quả đạt được Tuần 5

* Tăng cường bảo mật API bằng cách chặn các request độc hại thông qua WAF.
* Thiết lập đường dẫn quản trị DB an toàn mà không cần công khai RDS ra Internet.
* Tự động hóa 100% quy trình đồng bộ hồ sơ người dùng qua Lambda.

### Kế hoạch Tuần tới

* Tinh chỉnh chính sách Auto-scaling cho ECS Fargate.
* Phân tích sâu dữ liệu logs bằng CloudWatch Logs Insights.