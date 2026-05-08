---
title: Thiết Lập Frontend
slug: /workshop/4.3-frontend/
description: Nội dung workshop: thiết lập frontend SpendWise với NextJS và Amplify.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

Phần này nói về bước thiết lập frontend của SpendWise. Ứng dụng dùng NextJS và được triển khai qua AWS Amplify, nên mục tiêu ở đây là chạy được frontend ở local và hiểu cách nó sẽ nối sang backend ở các bước sau.

## What You Will Learn

- Thiết lập cấu trúc frontend.
- Chạy ứng dụng NextJS ở local.
- Hiểu cách Amplify kết nối frontend với hệ thống còn lại.
- Chuẩn bị phần giao tiếp với authentication và API.

## Requirements

- Hoàn thành phần 4.2 Prerequisites.
- Node.js 22.x LTS.
- npm 11+ hoặc pnpm.
- Git.
- Biết cơ bản về NextJS và React.

## Content

## Thiết lập Frontend

Phần frontend đã được chuẩn bị sẵn. Bước này chỉ cần clone dự án, cài dependencies và chạy local.

### 1. Clone repository

```bash
git clone https://github.com/NeuraX-HQ/neurax-web-app.git
cd neurax-web-app
```

### 2. Cài đặt dependencies

```bash
cd frontend
npm install
```

### 3. Chạy ứng dụng local

```bash
npm run dev
```

Lúc này bạn sẽ thấy frontend chạy trên trình duyệt. Một vài tính năng có thể vẫn là dữ liệu mẫu cho đến khi backend và Amplify được kết nối.

### 4. Cần kiểm tra gì

- Layout hiển thị đúng.
- Điều hướng giữa các trang hoạt động.
- Đổi ngôn ngữ hoạt động nếu dự án có hỗ trợ.
- Nội dung tĩnh không báo lỗi.

---

[Tiếp tục đến 4.4 Thiết Lập Backend](../4.4-Backend/)

## Kết luận

Khi frontend chạy ổn ở local, bạn có thể chuyển sang phần backend để kết nối tiếp các phần còn lại của SpendWise.
