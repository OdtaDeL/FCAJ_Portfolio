## Overview

Trước khi bắt đầu workshop này, bạn cần chuẩn bị đầy đủ quyền truy cập AWS, công cụ làm việc cục bộ và kiến thức nền tảng để có thể theo kịp lộ trình triển khai SpendWise. Các điều kiện này được xây dựng dựa trên overview và proposal của dự án, vốn sử dụng kiến trúc AWS 3 lớp bảo mật với Terraform, NextJS, NestJS, ECS Fargate, Cognito và RDS.

## What You Will Learn

Phần này giúp bạn chuẩn bị sẵn sàng để đi theo luồng triển khai SpendWise một cách trơn tru và nhất quán.

## Requirements

## 1. Tài khoản AWS và quyền truy cập
- Một tài khoản AWS có quyền `AdministratorAccess`.
- Quyền truy cập vào các dịch vụ được dùng trong dự án: VPC, ECS Fargate, ECR, RDS PostgreSQL, Cognito, Amplify, WAF, CloudWatch, Secrets Manager và ALB.
- AWS CLI profile đã được cấu hình cho tài khoản đích.

## 2. Công cụ phát triển cục bộ
- **Node.js 22.x LTS** cho frontend và backend tooling.
- **npm 11+** hoặc **pnpm** để quản lý package.
- **Docker Desktop** để build và test container image cục bộ.
- **AWS CLI** để xác thực và hỗ trợ triển khai.
- **Git** để clone repository và quản lý thay đổi mã nguồn.

## 3. Kiến thức nền tảng
- Kiến thức cơ bản về **NextJS** cho phần frontend.
- Kiến thức cơ bản về **NestJS** cho phần backend API.
- Hiểu biết về **Terraform** và Hạ tầng dưới dạng mã (IaC).
- Làm quen với container, biến môi trường, networking và kiến thức cơ bản về PostgreSQL.

## 4. Truy cập khuyến nghị
- Một trình soạn thảo mã như VS Code.
- Làm quen với cách điều hướng trong AWS Console.
- Hiểu sơ bộ về luồng xác thực như đăng nhập/đăng ký với Cognito.

---

[Tiếp tục đến 4.3 Thiết lập Frontend](../4.3-Frontend/)

## Kết luận

Khi đã chuẩn bị xong các điều kiện tiên quyết này, bạn có thể chuyển sang phần thiết lập Frontend và tiếp tục xây dựng SpendWise từng bước một.
