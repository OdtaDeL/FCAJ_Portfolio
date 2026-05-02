### Mục Tiêu Tuần 6

* Tăng cường bảo mật cho hệ thống ứng dụng.
* Thiết lập các cơ chế truy cập an toàn vào tài nguyên nội bộ.
* Tự động hóa một số quy trình xử lý dữ liệu.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
|------|----------|--------|------------|--------------------|
| 1 | - Triển khai AWS WAF <br>&emsp; + Tạo Web ACL và gắn vào ALB <br>&emsp; + Cấu hình rule cơ bản | 13/04/2026 | 13/04/2026 | - |
| 2 | - Cấu hình WAF Rules <br>&emsp; + Chặn SQL Injection (SQLi) <br>&emsp; + Chặn Cross-site scripting (XSS) <br>&emsp; + Giới hạn Rate Limit | 14/04/2026 | 14/04/2026 | - |
| 3 | - Triển khai Bastion Host <br>&emsp; + Tạo EC2 instance nhỏ <br>&emsp; + Thiết lập port forwarding tới RDS | 15/04/2026 | 15/04/2026 | - |
| 4 | - Cấu hình AWS Lambda <br>&emsp; + Trigger PostConfirmation từ Cognito <br>&emsp; + Đồng bộ dữ liệu user vào RDS | 16/04/2026 | 16/04/2026 | - |
| 5 | - Kiểm toán bảo mật <br>&emsp; + Giới hạn IP truy cập Bastion <br>&emsp; + Kiểm tra lại Security Group | 17/04/2026 | 17/04/2026 | - |
| 6 | - Kiểm thử hệ thống <br>&emsp; + Test luồng đăng ký người dùng <br>&emsp; + Kiểm tra tính nhất quán dữ liệu | 18/04/2026 | 18/04/2026 | - |
| 7 | - Phân tích log bảo mật <br>&emsp; + Review log từ WAF <br>&emsp; + Đánh giá hiệu quả chặn request độc hại | 19/04/2026 | 19/04/2026 | - |

### Kết quả đạt được Tuần 6

* Hệ thống được bảo vệ trước các lỗ hổng web phổ biến.
* Thiết lập đường truy cập quản trị an toàn mà không cần mở public database.
* Quy trình đồng bộ dữ liệu người dùng được tự động hóa hoàn toàn.

### Khó khăn & Bài học

* **Khó khăn:** Cấu hình WAF rule ban đầu dễ gây false positive.
* **Giải pháp:** Điều chỉnh rule dựa trên log thực tế và test nhiều kịch bản.
* **Bài học:** Bảo mật cần được kiểm thử liên tục để đảm bảo không ảnh hưởng tới người dùng thật.

### Kế hoạch Tuần tới

* Tối ưu hiệu năng và chi phí hệ thống.
* Thiết lập Auto-scaling cho ECS Fargate.
* Phân tích chi tiết logs hệ thống.