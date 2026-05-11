
## Overview

Trong phần cuối cùng này, bạn sẽ hoàn thiện triển khai SpendWise API bằng cách build Docker image của NestJS, đẩy nó lên ECR, và cấu hình cụm ECS Fargate với Application Load Balancer. ALB phục vụ như là điểm vào duy nhất cho tất cả traffic bên ngoài, định tuyến các yêu cầu đến các instances NestJS container chạy trong subnets riêng tư. Bạn cũng sẽ triển khai AWS WAF (Web Application Firewall) để bảo vệ chống lại các cuộc tấn công phổ biến và rate-limit traffic độc hại. Đây là kết thúc của tất cả các phần trước, mang lại cùng nhau mạng, hạ tầng, bảo mật, và tổ chức thành một triển khai API đầy đủ chức năng, sẵn sàng cho sản xuất.

## What You Will Learn

- Build Docker images multi-platform (ARM64) được tối ưu hóa cho AWS Graviton
- Đẩy Docker images lên Amazon ECR
- Tạo task definitions cho ECS với cấu hình CPU, memory, và environment variables
- Thiết lập cụm ECS Fargate và services
- Cấu hình Application Load Balancers (ALB) với target groups và health checks
- Tích hợp AWS WAF với ALB cho rate limiting và bảo vệ mối đe dọa
- Triển khai auto-scaling cho ECS services
- Hiểu tối ưu hóa chi phí với FARGATE_SPOT capacity providers

## Requirements

- Hoàn thành [4.5.1 VPC & Networking](../4.5.1-VPC-Network/), [4.5.2 Infrastructure](../4.5.2-Infrastructure/), và [4.5.3 NAT Instance](../4.5.3-NAT-Instance/)
- SpendWise NestJS backend mã nguồn có sẵn cục bộ với Dockerfile
- Docker được cài đặt và cấu hình trên máy của bạn
- Tài khoản Docker Hub hoặc private container registry (để đẩy images)
- Tài khoản AWS với quyền ECS, ALB, và WAF
- Task Execution Role (`ecsTaskExecutionRole`) và Task Role (`ecsTaskRole`) được tạo và cấu hình
- Khoảng 45-60 phút để hoàn thành phần này

## Content

﻿Đây là bước cuối cùng để hoàn thiện việc triển khai API SpendWise: build Docker image cho service NestJS, đẩy lên registry, và thiết lập cụm ECS Fargate cùng Application Load Balancer (ALB).

## 1. Build & Push Docker Image

Chúng ta cần có một Docker image chứa mã nguồn NestJS của SpendWise được tối ưu cho kiến trúc ARM64 của AWS Graviton.

### Build và Push lên Docker Hub
```bash
# Đăng nhập Docker Hub
docker login

# Build multi-platform (ARM64) và push trực tiếp
docker buildx build \
  --platform linux/arm64 \
  --tag <username>/spendwise-api:latest \
  --push .
```

---

## 2. Khởi tạo ECS Cluster

1. Vào **ECS Console** → **Clusters** → **Create cluster**.
2. **Cluster name**: `spendwise-api-cluster`.
3. **Infrastructure**: Chọn `AWS Fargate (serverless)`.
4. Nhấn **Create**.

---

## 3. Định nghĩa Task (Task Definition)

Task Definition chỉ định image nào sẽ chạy, tài nguyên CPU/RAM và các biến môi trường cần thiết.

1. Vào **Task Definitions** → **Create new task definition**.
2. **OS/Architecture**: `Linux/ARM64` (Để tiết kiệm chi phí với Graviton).
3. **CPU**: `1 vCPU`, **Memory**: `2 GB`.
4. **Task Execution Role**: `ecsTaskExecutionRole`.
5. **Container Details**:
  - **Name**: `spendwise-api-container`
  - **Image**: `<username>/spendwise-api:latest`
  - **Port mapping**: `3000` (TCP).
6. **Environment variables**: Inject các API Keys từ Secrets Manager sử dụng cú pháp `ValueFrom`.

---

## 4. Application Load Balancer (ALB)

ALB đóng vai trò tiếp nhận traffic từ người dùng và phân phối đến các container của ECS.

1. **Target Group**: Tạo Target Group tên `spendwise-api-tg`, port 3000, type **IP**. Health check path: `/health`.
2. **Load Balancer**: Tạo ALB loại **Internet-facing**, chọn các Public Subnet đã tạo ở bước 4.5.1.
3. **Security Group**: Gắn `spendwise-api-vpc-alb-sg`.
4. **Listener**: Chuyển hướng traffic từ port 80 sang Target Group vừa tạo.

---

## 5. Cấu hình Bảo mật với AWS WAF

Hãy chèn thêm một lớp bảo mật (WAF) để giảm brute-force và bot traffic. Với SpendWise, API phải chỉ chấp nhận request đã xác thực từ frontend và client tin cậy.

- **Rate Limit**: Giới hạn mỗi IP tối đa 100 request trong 5 phút.
- **JWT-based access**: Bảo vệ API bằng token do Cognito phát hành.

---

## 6. ECS Service

Cuối cùng, hãy tạo Service để duy trì số lượng task luôn chạy.

1. Vào Cluster → tab **Services** → **Create**.
2. **Capacity Provider**: `FARGATE_SPOT` (Để tối ưu chi phí tối đa).
3. **Deployment Configuration**: Chọn Task Definition vừa tạo.
4. **Networking**: Chọn 2 Private Subnets và Security Group của ECS.
5. **Load Balancing**: Chọn ALB và Target Group đã thiết lập.
6. Nhấn **Create**.

---

## Kết quả đạt được:

Backend SpendWise của bạn hiện đã hoàn thiện:
- API NestJS chạy trên ECS Fargate.
- Kết nối riêng tư tới RDS PostgreSQL.
- Lưu lượng công khai được kiểm soát bởi ALB và WAF.

---

[Tiếp tục đến 4.6 Dọn Dẹp](../../4.6-Cleanup/)

## Conclusion

Chúc mừng! Bạn đã hoàn thành thành công triển khai SpendWise API trên AWS. Backend NestJS của bạn hiện đang chạy trên ECS Fargate trên nhiều Availability Zones, được bảo vệ bởi Application Load Balancer và AWS WAF. Tất cả traffic chảy an toàn thông qua ALB, cái phân phối các yêu cầu đến ECS tasks riêng tư. Hạ tầng của bạn có khả năng mở rộng, có tính sẵn sàng cao, và tối ưu hóa chi phí với NAT Instance egress và Fargate Spot capacity. SpendWise API sẵn sàng cho sản xuất và có thể phục vụ các yêu cầu đã xác thực từ ứng dụng frontend với quyền truy cập đầy đủ cơ sở dữ liệu qua RDS PostgreSQL. Tiến hành đến phần [Cleanup](../../4.6-Cleanup/) để tìm hiểu cách an toàn gỡ bỏ các tài nguyên khi triển khai của bạn hoàn tất.
