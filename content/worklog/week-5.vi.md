### Mục Tiêu Tuần 5

* Thiết lập hệ thống giám sát cho toàn bộ ứng dụng.
* Kiểm thử hiệu năng và độ ổn định của hệ thống.
* Bắt đầu kiểm soát chi phí vận hành trên AWS.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
|------|----------|--------|------------|--------------------|
| 1 | - Thực hiện kiểm thử tải (Stress test) <br>&emsp; + Test ALB và ECS dưới tải cao <br>&emsp; + Ghi nhận các chỉ số hiệu năng | 06/04/2026 | 06/04/2026 | - |
| 2 | - Thiết lập Amazon CloudWatch <br>&emsp; + Thu thập Logs và Metrics <br>&emsp; + Theo dõi CPU, Memory, Request | 07/04/2026 | 07/04/2026 | - |
| 3 | - Xây dựng Dashboard giám sát <br>&emsp; + Tổng hợp các chỉ số quan trọng <br>&emsp; + Trực quan hóa dữ liệu hệ thống | 08/04/2026 | 08/04/2026 | - |
| 4 | - Cấu hình cảnh báo chi phí <br>&emsp; + Thiết lập Budget Alarms <br>&emsp; + Nhận thông báo khi vượt ngưỡng | 09/04/2026 | 09/04/2026 | - |
| 5 | - Tối ưu log <br>&emsp; + Điều chỉnh thời gian lưu trữ (retention) <br>&emsp; + Giảm chi phí CloudWatch Logs | 10/04/2026 | 10/04/2026 | - |
| 6 | - Xây dựng Runbook vận hành <br>&emsp; + Hướng dẫn xử lý sự cố <br>&emsp; + Quy trình restart dịch vụ | 11/04/2026 | 11/04/2026 | - |
| 7 | - Kiểm tra hệ thống tổng thể <br>&emsp; + Đánh giá hiệu năng sau tối ưu <br>&emsp; + Chuẩn bị cho giai đoạn bảo mật nâng cao | 12/04/2026 | 12/04/2026 | - |

### Kết quả đạt được Tuần 5

* Hệ thống giám sát hoạt động đầy đủ, cho phép theo dõi realtime.
* Thiết lập được các mốc hiệu năng cơ bản của hệ thống.
* Chi phí được kiểm soát thông qua các cảnh báo tự động.

### Khó khăn & Bài học

* **Khó khăn:** Chi phí CloudWatch Logs tăng nhanh do cấu hình mặc định.
* **Giải pháp:** Giới hạn thời gian lưu trữ logs và tối ưu cấu hình.
* **Bài học:** Monitoring không chỉ giúp phát hiện lỗi mà còn giúp tối ưu chi phí.

### Kế hoạch Tuần tới

* Tăng cường bảo mật với AWS WAF.
* Thiết lập Bastion Host để truy cập hệ thống an toàn.
* Tự động hóa một số quy trình backend.