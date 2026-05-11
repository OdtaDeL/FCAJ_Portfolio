

## Overview

Trong phần này, bạn sẽ triển khai một giải pháp thay thế tối ưu hóa chi phí cho AWS NAT Gateway bằng cách triển khai NAT Instance trên EC2. Cách tiếp cận này cho phép ECS tasks riêng tư truy cập các tài nguyên bên ngoài (chẳng hạn như các kho lưu trữ package và APIs bên ngoài) trong khi vẫn duy trì cô lập bảo mật. Bằng cách sử dụng instance t4g.nano nhẹ với kiến trúc ARM Graviton, bạn sẽ giảm chi phí NAT từ ~$32/tháng xuống khoảng $4.33/tháng. Bạn sẽ cấu hình IP forwarding và iptables masquerading để cho phép dịch thuật gói tin, và tùy chọn thiết lập Auto Scaling Group để đảm bảo tính sẵn sàng cao.

## What You Will Learn

- Hiểu các trade-offs giữa NAT Gateway vs. NAT Instance (chi phí, thông lượng, quản lý)
- Khởi chạy và cấu hình EC2 instance như một NAT appliance
- Vô hiệu hóa source/destination checking để kích hoạt packet forwarding
- Kích hoạt IP forwarding và cấu hình iptables cho NAT masquerading
- Thiết lập private subnet route tables để định tuyến traffic outbound qua NAT Instance
- Triển khai tính sẵn sàng cao với Auto Scaling Groups
- Theo dõi hiệu năng NAT Instance và chi phí

## Requirements

- Hoàn thành [4.5.1 VPC & Networking](../4.5.1-VPC-Network/) và [4.5.2 Infrastructure](../4.5.2-Infrastructure/)
- Tài khoản AWS với quyền EC2 (khởi chạy instances, sửa đổi security groups, gắn IAM roles)
- Quyền truy cập SSH hoặc AWS Systems Manager Session Manager để cấu hình instance
- IAM role được tạo cho NAT Instance: `spendwise-api-vpc-nat-instance-role`
- Khoảng 25-35 phút để hoàn thành phần này

## Content

﻿## 1. Khởi tạo NAT Instance

Chúng ta sẽ sử dụng instance type `t4g.nano` (kiến trúc ARM Graviton) để tối ưu chi phí và hiệu năng.

1. Vào **EC2 Console** → **Launch Instances**.
2. **AMI**: Chọn **Amazon Linux 2023** (Bản 64-bit Arm).
3. **Instance Type**: `t4g.nano`.
4. **Network Settings**:
   - VPC: `spendwise-api-vpc`
   - Subnet: `spendwise-api-vpc-public-alb01` (Public Subnet)
   - Auto-assign Public IP: **Enable**
   - Security Group: `spendwise-api-vpc-nat-sg`
5. **IAM instance profile**: Chọn `spendwise-api-vpc-nat-instance-role`.
6. Nhấn **Launch instance**.

> [!IMPORTANT]
> Sau khi instance đã chạy, bạn **bắt buộc** phải tắt tính năng **Source/Destination Check**:
> Chọn Instance → **Actions** → **Networking** → **Change source/destination check** → Chọn **Stop**.

---

## 2. Cấu hình NAT (Script tự động)

Sau khi SSH hoặc dùng SSM để vào NAT Instance, bạn hãy chạy script sau để bật tính năng chuyển tiếp gói tin (IP Forwarding) và cấu hình Masquerade:

```bash
#!/bin/bash
# 1. Bật IP Forwarding
sudo sysctl -w net.ipv4.ip_forward=1

# 2. Cài đặt iptables-services
sudo dnf install iptables-services -y
sudo systemctl enable iptables
sudo systemctl start iptables

# 3. Cấu hình NAT Masquerade (Thay eth0 bằng interface thực tế nếu khác)
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables-save | sudo tee /etc/sysconfig/iptables
```

---

## 3. Cấu hình High Availability (ASG)

Để đảm bảo hệ thống không bị gián đoạn khi một NAT Instance gặp sự cố, chúng ta nên sử dụng **Auto Scaling Group (ASG)**.

ASG sẽ tự động phát hiện nếu instance bị lỗi và khởi tạo một instance mới thay thế. Bạn có thể sử dụng **User Data** trong Launch Template để tự động chạy các lệnh cấu hình trên và cập nhật Route Table trỏ về Instance ID mới.

> [!TIP]
> Bạn nên tạo mỗi AZ một ASG riêng biệt với `Desired Capacity = 1` để đảm bảo mỗi AZ luôn có đúng một NAT Instance hoạt động.

---

## Các bước tiếp theo:

Hạ tầng mạng và NAT đã sẵn sàng. Bước cuối cùng là triển khai ứng dụng của chúng ta:
- [4.5.4 Triển khai Fargate & ALB](../4.5.4-Fargate-ALB/)

## Conclusion

Bạn đã thành công triển khai và cấu hình NAT Instance được tối ưu hóa chi phí cho hạ tầng SpendWise. NAT Instance của bạn hiện xử lý traffic internet outbound từ ECS tasks riêng tư trong khi giảm chi phí NAT hàng tháng khoảng 87% so với AWS NAT Gateway. Instance được cấu hình với IP forwarding và iptables masquerading, và tùy chọn được bảo vệ bằng Auto Scaling Group để đảm bảo tính sẵn sàng cao. ECS tasks của bạn giờ có thể an toàn truy cập các tài nguyên bên ngoài trong khi vẫn duy trì cô lập mạng. Bạn hiện đã sẵn sàng triển khai NestJS API trên ECS Fargate với Application Load Balancer.
