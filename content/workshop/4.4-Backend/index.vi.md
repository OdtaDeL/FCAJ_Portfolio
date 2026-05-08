---
title: Thiết Lập Backend
slug: /workshop/4.4-backend/
description: Nội dung workshop: chuẩn bị nền tảng backend cho SpendWise với AWS Amplify Gen 2.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

Phần này chuẩn bị nền tảng backend cho SpendWise. Backend được xây bằng AWS Amplify Gen 2 và chia theo các lớp: xác thực, dữ liệu, lưu trữ và functions.

## What You Will Learn

- Khởi tạo dự án backend với Amplify.
- Hiểu cấu trúc thư mục amplify/.
- Chuẩn bị các lớp auth, data, storage và function.
- Triển khai môi trường sandbox cho việc làm local.

## Requirements

- Hoàn thành phần 4.3 Thiết Lập Frontend.
- Node.js 22.x LTS.
- npm 11+ hoặc pnpm.
- AWS CLI đã cấu hình quyền admin.
- Biết cơ bản về TypeScript và serverless.

## Content

## Khởi tạo backend

SpendWise dùng Amplify Gen 2 làm nền tảng backend. Bước đầu tiên là tạo workspace backend và cài các dependency cần thiết.

### 1. Tạo thư mục backend

```bash
cd neurax-web-app
mkdir backend
cd backend
```

### 2. Cài đặt dependencies

```bash
npm create amplify@latest --yes
npm install
```

### 3. Chạy sandbox

```bash
npx ampx pipeline-deploy --branch main --app-id [YOUR_APP_ID]

# Hoặc dùng local work:
npx ampx sandbox
```

## Chi tiết các lớp tài nguyên

Các lớp chính trong thư mục amplify/ gồm:

1. [Lớp Xác thực (Auth)](4.4.1-Auth/)
2. [Lớp Dữ liệu (Data)](4.4.2-Data/)
3. [Lớp Lưu trữ (Storage)](4.4.3-Storage/)
4. [Các hàm Logic (Functions)](4.4.4-Functions/)

---

[Tiếp tục đến 4.5 Tầng Container ECS](../4.5-ECS-Fargate/)

## Kết luận

Sau bước này, nền tảng backend đã sẵn sàng. Tiếp theo, bạn sẽ đi vào từng lớp tài nguyên để xử lý xác thực, dữ liệu, lưu trữ và logic của SpendWise.
