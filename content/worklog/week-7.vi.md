### Mục Tiêu Tuần 7

* Tối ưu hiệu năng hệ thống dựa trên dữ liệu thực tế.
* Thiết lập cơ chế tự động mở rộng (Auto-scaling).
* Phân tích và tối ưu chi phí vận hành trên AWS.

### Các công việc thực hiện trong tuần

| Ngày | Công việc | Bắt đầu | Hoàn thành | Tài liệu tham khảo |
|------|----------|--------|------------|--------------------|
| 1 | - Phân tích tài nguyên hệ thống <br>&emsp; + Theo dõi CPU và Memory của ECS <br>&emsp; + Đánh giá mức sử dụng thực tế | 20/04/2026 | 20/04/2026 | - |
| 2 | - Tối ưu ECS Task <br>&emsp; + Điều chỉnh CPU/RAM (Right-sizing) <br>&emsp; + Giảm tài nguyên dư thừa | 21/04/2026 | 21/04/2026 | - |
| 3 | - Thiết lập Auto-scaling <br>&emsp; + Cấu hình scale dựa trên Request từ ALB <br>&emsp; + Kiểm tra hành vi scale in/out | 22/04/2026 | 22/04/2026 | - |
| 4 | - Phân tích logs <br>&emsp; + Sử dụng CloudWatch Logs Insights <br>&emsp; + Tạo query theo dõi lỗi 5xx | 23/04/2026 | 23/04/2026 | - |
| 5 | - Kiểm thử khả năng tự phục hồi <br>&emsp; + Giả lập crash service <br>&emsp; + Quan sát cơ chế tự restart của ECS | 24/04/2026 | 24/04/2026 | - |
| 6 | - Tối ưu chi phí mạng <br>&emsp; + Đánh giá NAT Gateway <br>&emsp; + So sánh với VPC Endpoint | 25/04/2026 | 25/04/2026 | - |
| 7 | - Dọn dẹp tài nguyên <br>&emsp; + Thiết lập ECR Lifecycle Policy <br>&emsp; + Loại bỏ tài nguyên không sử dụng | 26/04/2026 | 26/04/2026 | - |

### Kết quả đạt được Tuần 7

* Hệ thống có khả năng tự động mở rộng linh hoạt theo tải.
* Giảm chi phí nhờ tối ưu tài nguyên và loại bỏ resource dư thừa.
* Cải thiện khả năng phát hiện và xử lý lỗi thông qua logs.

### Khó khăn & Bài học

* **Khó khăn:** Khó xác định ngưỡng scale phù hợp ban đầu.
* **Giải pháp:** Theo dõi dữ liệu thực tế và điều chỉnh dần theo thời gian.
* **Bài học:** Tối ưu hệ thống là quá trình liên tục, cần dựa trên số liệu thay vì giả định.

### Kế hoạch Tuần tới

* Hoàn thiện tài liệu kiến trúc thực tế (As-built).
* Kiểm thử khôi phục dữ liệu (Disaster Recovery).
* Tổng kết và bàn giao dự án.