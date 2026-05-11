

## Overview

Trong phần này, bạn sẽ thiết lập các dịch vụ hạ tầng hỗ trợ cho phép triển khai an toàn và đáng tin cậy của SpendWise API trên ECS Fargate. Điều này bao gồm tạo Amazon ECR (Elastic Container Registry) để lưu trữ Docker images của NestJS, cấu hình AWS Secrets Manager để quản lý an toàn thông tin xác thực cơ sở dữ liệu và secrets JWT, và thiết lập các IAM roles cho phép ECS tasks truy cập những tài nguyên này với quyền tối thiểu. Cùng với nhau, những dịch vụ này tạo thành xương sống bảo mật và triển khai của ứng dụng container của bạn.

## What You Will Learn

- Tạo private Amazon ECR repository và hiểu workflow push/pull images
- Cấu hình AWS Secrets Manager để lưu trữ credentials nhạy cảm
- Thiết lập IAM roles và trust relationships cho tích hợp dịch vụ ECS
- Hiểu sự khác biệt giữa `ecsTaskExecutionRole` (cho AWS services) và `ecsTaskRole` (cho logic ứng dụng)
- Thực hiện chính sách truy cập least-privilege
- Tiêm secrets vào containers dưới dạng environment variables

## Requirements

- Hoàn thành [4.5.1 VPC & Networking](../4.5.1-VPC-Network/)
- Tài khoản AWS với quyền IAM để tạo ECR repositories, Secrets Manager secrets, và IAM roles
- Kiến thức về RDS endpoint, database credentials, và JWT secret values (từ cấu hình backend)
- Khoảng 30-40 phút để hoàn thành phần này

## Content

﻿Phần này hướng dẫn thiết lập các thành phần hạ tầng hỗ trợ cho cụm ECS Fargate của SpendWise: **ECR** để lưu Docker image, **Secrets Manager** để quản lý credentials an toàn, và **IAM Roles** để cấp quyền thực thi.

> **Điều kiện tiên quyết:** Đã hoàn thành [4.5.1 Hạ tầng Mạng (VPC & Network)](../4.5.1-VPC-Network/).

---

## 1. Amazon ECR (Container Registry)

Chúng ta cần một Amazon ECR repository để lưu Docker image dùng cho container API của SpendWise.

### 1.1 Tạo ECR Repository
1. Vào AWS Console → **ECR** → **Repositories** → **Create repository**.
2. **Repository name**: `spendwise-api`.
3. **Visibility**: Private.
4. Nhấn **Create repository**.

---

## 2. Secrets Manager

Secrets Manager giúp lưu trữ database credentials, JWT secrets, và cài đặt Cognito một cách an toàn rồi inject vào container dưới dạng biến môi trường.

### 2.1 Tạo Secret
1. Vào **Secrets Manager** → **Store a new secret**.
2. Chọn **Secret type**: `Other type of secret`.
3. Thêm các cặp **Key/value** sau:
  - `DB_HOST`: <RDS endpoint>
  - `DB_USER`: <Database user>
  - `DB_PASSWORD`: <Database password>
  - `JWT_SECRET`: <Shared JWT secret>
4. Đặt tên Secret: `spendwise/prod/backend-credentials`.
5. Sau khi lưu, hãy copy mã **ARN** của Secret này để dùng cho bước tiếp theo.

---

## 3. IAM Roles cho ECS

ECS sử dụng hai Role riêng biệt cho hai mục đích khác nhau:

| Role Name | Đối tượng sử dụng | Mục đích |
| :--- | :--- | :--- |
| **`ecsTaskExecutionRole`** | AWS ECS Agent | Pull Docker image, gửi log về CloudWatch, đọc Secrets Manager. |
| **`ecsTaskRole`** | Ứng dụng bên trong container | Đọc credentials RDS, truy cập Secrets Manager, ghi logs khi cần. |

### 3.1 Cấu hình `ecsTaskExecutionRole`
1. Tìm hoặc tạo Role tên `ecsTaskExecutionRole`.
2. Đảm bảo Role đã có managed policy: `AmazonECSTaskExecutionRolePolicy`.
3. Thêm **Inline Policy** (JSON) để cho phép đọc Secret ARN đã copy ở trên:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": ["<YOUR_SECRET_ARN>"]
    }
  ]
}
```

### 3.2 Tạo `ecsTaskRole`
1. Tạo Role mới với Trusted Entity là `Elastic Container Service Task`.
2. Gắn **Inline Policy** cho phép truy cập Secrets Manager và các AWS API cần thiết cho backend:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::spendwise-cache-xxxx",
        "arn:aws:s3:::spendwise-cache-xxxx/*"
      ]
    }
  ]
}
```

---

## Các bước tiếp theo:

Hạ tầng nền tảng đã sẵn sàng. Bây giờ chúng ta sẽ tối ưu hóa chi phí đường truyền internet:
- [4.5.3 Tối ưu hóa NAT (NAT Instance)](../4.5.3-NAT-Instance/)
- [4.5.4 Triển khai Fargate & ALB](../4.5.4-Fargate-ALB/)

## Conclusion

Bạn đã thành công provisioning hạ tầng hỗ trợ cho triển khai SpendWise API. ECR repository của bạn sẵn sàng nhận Docker images của NestJS, Secrets Manager lưu trữ an toàn thông tin xác thực cơ sở dữ liệu và JWT secrets với quyền kiểm soát, và IAM roles được cấu hình với chính sách least-privilege. Lớp hạ tầng này cung cấp nền tảng an toàn để triển khai các ứng dụng container. Bạn hiện đã sẵn sàng cấu hình NAT Instance cho truy cập internet tiết kiệm chi phí từ private subnets.
