---
title: Thiết Lập Backend
slug: /workshop/4.4-backend/
description: Nội dung workshop: chuẩn bị nền tảng backend cho SpendWise với NestJS và Docker.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

Phần này chuẩn bị backend NestJS cho SpendWise và container hóa bằng Docker. Backend kết nối đến Amazon Cognito để xác thực, Amazon RDS PostgreSQL để lưu dữ liệu, và Secrets Manager để quản lý credentials an toàn.

## What You Will Learn

- Khởi tạo dự án NestJS với TypeScript và TypeORM.
- Cấu hình kết nối PostgreSQL đến Amazon RDS.
- Tích hợp Amazon Cognito cho xác thực dựa trên JWT.
- Thiết lập biến môi trường và Secrets Manager.
- Tạo Dockerfile và chuẩn bị cho triển khai ECS.
- Hiểu cách phân chia trách nhiệm: lớp Auth, Data, Storage.

## Requirements

- Hoàn thành phần 4.3 Thiết Lập Frontend.
- Node.js 22.x LTS và npm 11+ hoặc pnpm.
- AWS CLI đã cấu hình quyền admin.
- Docker đã cài đặt trên máy local.
- Kiến thức cơ bản về NestJS, TypeORM, và containerization.
- Quen thuộc với PostgreSQL và các khái niệm cơ sở dữ liệu quan hệ.

## Content

## Khởi tạo Backend

Backend của SpendWise được xây bằng **NestJS** — một framework TypeScript-first mạnh mẽ để xây dựng các ứng dụng phía máy chủ có khả năng mở rộng cao. Khác với phương pháp serverless, kiến trúc này sử dụng container hóa (Docker) và ECS Fargate cho các quá trình chạy lâu dài và stateful.

### 1. Tạo thư mục backend

```bash
mkdir spendwise-backend
cd spendwise-backend
```

### 2. Khởi tạo dự án NestJS

```bash
npm i -g @nestjs/cli
nest new . --package-manager npm
npm install
```

### 3. Cài đặt các dependency cần thiết

```bash
# Database & ORM
npm install @nestjs/typeorm typeorm pg

# Authentication
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @types/passport-jwt

# Configuration
npm install @nestjs/config dotenv

# AWS SDK (cho Secrets Manager & Cognito)
npm install @aws-sdk/client-secrets-manager

# Utilities
npm install class-transformer class-validator bcrypt
npm install @types/bcrypt
```

### 4. Kiểm tra cài đặt

```bash
npm run start:dev
```

Server sẽ chạy trên `http://localhost:3000`.

---

## Các Lớp Kiến Trúc Backend

Backend của SpendWise được tổ chức thành bốn lớp chức năng chính:

1. **[Lớp Xác Thực (4.4.1)](4.4.1-Auth/)** — Tích hợp Cognito, xác thực JWT, auth guards
2. **[Lớp Dữ Liệu (4.4.2)](4.4.2-Data/)** — Schema PostgreSQL, TypeORM entities, migrations cơ sở dữ liệu
3. **[Lớp Lưu Trữ (4.4.3)](4.4.3-Storage/)** — Secrets Manager, cấu hình biến môi trường, quản lý credentials
4. **[Lớp API Functions (4.4.4)](4.4.4-Functions/)** — Controllers, services, các endpoints logic kinh doanh

Mỗi lớp có thể được kiểm tra độc lập và có thể được triển khai dưới dạng một container.

---

[Tiếp tục đến 4.5 Triển Khai ECS Fargate](../4.5-ECS-Fargate/)

## Kết Luận

Với NestJS đã được khởi tạo và các dependencies đã cài đặt, nền tảng backend của bạn đã sẵn sàng. Tiếp theo, bạn sẽ cấu hình từng lớp để xây dựng một API cấp sản xuất tích hợp Cognito cho xác thực, RDS cho dữ liệu, và chuẩn bị cho triển khai container trên ECS Fargate.
