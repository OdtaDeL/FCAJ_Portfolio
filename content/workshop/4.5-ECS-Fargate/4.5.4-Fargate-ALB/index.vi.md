
## Overview

_TBD._

## What You Will Learn

_TBD._

## Requirements

_TBD._

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

_TBD._
