
## 4.2.4 Cơ sở dữ liệu

**Tầng dữ liệu** đặt **RDS PostgreSQL** trong **subnet private data**, tách khỏi subnet ứng dụng — traffic DB không ra Internet công cộng; mật khẩu qua **Secrets Manager**; **bastion** tùy chọn cho thao tác vận hành.

Có thể bố trí **RDS trên nhiều AZ** (ví dụ primary và bản **standby / backup** giữa các **private subnet** như sơ đồ) để tăng **độ sẵn sàng (HA)** và khả năng chịu lỗi. Trong **giai đoạn phát triển** thường **chỉ dùng một instance** để **tối ưu chi phí**; môi trường production có thể bật **Multi-AZ** / standby theo yêu cầu vận hành.

![RDS PostgreSQL và RDS backup trong hai private subnet (minh họa HA giữa các AZ)](/images/4-Workshop/4.2.4-database-private-rds.png)

### RDS PostgreSQL

**Vai trò:** CSDL quan hệ chính cho backend **NestJS** / **Prisma**; instance nằm trong **private data subnet**, chỉ lắng nghe Postgres nội bộ.

**Lý do chọn:** PostgreSQL phù hợp mô hình quan hệ + Prisma; RDS giảm vận hành patch/backup cơ bản so với tự cài Postgres trên EC2.

### RDS Security Group (nhóm bảo mật tầng dữ liệu)

**Vai trò:** Security Group gắn **RDS** (ví dụ tên **…-rds-sg** trong module **security_groups**): ingress **TCP 5432** chỉ từ **Security Group của task ECS**; có thể thêm luồng từ **bastion** khi bật truy cập DB qua bastion.

**Lý do chọn:** Không mở Postgres ra 0.0.0.0/0; chỉ cho phép lớp ứng dụng (và tùy chọn jump host) nói chuyện với DB — giảm bề mặt tấn công.

### Secrets Manager (mật khẩu DB)

**Vai trò:** Lưu **mật khẩu RDS** dạng secret, inject vào ứng dụng/Lambda qua IAM thay vì hard-code.

**Lý do chọn:** Không để mật khẩu trong repo hay biến môi trường thô; xoay vòng và kiểm soát truy cập theo chính sách AWS.

### Bastion (tùy chọn)

**Vai trò:** Máy **EC2** trong subnet public (hoặc tương đương) để admin kết nối DB qua SSM/SSH tùy cấu hình.

**Lý do chọn:** Khi cần truy vấn/troubleshoot DB trực tiếp mà không bật endpoint công khai cho RDS; có thể tắt trên dev để tiết kiệm.

### Bảng dữ liệu cốt lõi (TypeORM / PostgreSQL)

Tên bảng vật lý bám theo mapping entity của TypeORM trong backend SpendWise.

| Bảng | Vai trò chính |
| :--- | :--- |
| **users** | Người dùng ứng dụng; liên kết Cognito qua `cognito_sub` và email duy nhất. |
| **transactions** | Giao dịch với số tiền, loại giao dịch, category và thời gian tạo. |
| **budgets** | Ngân sách do người dùng đặt và số tiền đã chi. |
| **categories** | Category thu/chi dùng chung hoặc do người dùng tạo. |

Bốn bảng này là mô hình dữ liệu cốt lõi được dùng xuyên suốt workshop. Nếu backend mở rộng sau này, có thể bổ sung thêm field bằng migrations TypeORM.
