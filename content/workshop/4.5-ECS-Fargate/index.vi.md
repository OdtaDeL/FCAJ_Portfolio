---
title: Tầng ECS Fargate
slug: /workshop/4.5-ecs-fargate/
description: Nội dung workshop: triển khai tầng container SpendWise với ECS Fargate.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

Phần này nói về tầng ECS Fargate của SpendWise. Backend container sẽ chạy song song với backend Amplify và dùng cho những phần phù hợp hơn với container, như API NestJS, các tác vụ chạy lâu hơn hoặc những xử lý cần runtime ổn định.

## What You Will Learn

- Triển khai backend container bằng ECS Fargate.
- Thiết lập VPC và mạng xung quanh dịch vụ.
- Đặt API phía sau Application Load Balancer.
- Dùng NAT Instance và endpoint để giữ chi phí ở mức vừa phải.
- Kết nối tầng container với phần còn lại của SpendWise.

## Requirements

- Hoàn thành phần 4.4 Thiết Lập Backend.
- Đã cài Docker Desktop.
- Hiểu cơ bản về container và AWS networking.
- Biết sơ về NestJS hoặc API server-side.

## Content

Tầng ECS Fargate chạy phần container của SpendWise. Đây là nơi phù hợp cho API NestJS và các công việc không nên nhét vào Lambda.

## Kiến trúc Hệ thống

![Kiến trúc API VPC của SpendWise](images/only-nutritrack-api-vpc.drawio.svg)

Các ECS task chạy trong **Private Subnet** để đảm bảo an toàn, còn **Application Load Balancer (ALB)** nằm ở **Public Subnet** để nhận traffic từ internet. Task truy cập các dịch vụ AWS thông qua **NAT Instance** hoặc thông qua endpoint khi có thể.

## Ước tính Chi phí

| Thành phần | Chi phí ước tính/tháng |
| :--- | :--- |
| 2× NAT Instance `t4g.nano` | $7.63 |
| Fargate ARM64 Task | $10.23 |
| Application Load Balancer (ALB) | $28.46 |
| CloudWatch Logs | $0.00 |
| **Tổng cộng** | **≈$46** |

> [!TIP]
> NAT Instance rẻ hơn NAT Gateway và đủ dùng cho cấu hình của workshop này.

## Các bước triển khai

1. [4.5.1 Hạ tầng Mạng (VPC & Network)](4.5.1-VPC-Network/)
2. [4.5.2 Hạ tầng hỗ trợ](4.5.2-Infrastructure/)
3. [4.5.3 Tối ưu hóa NAT](4.5.3-NAT-Instance/)
4. [4.5.4 Triển khai Fargate & ALB](4.5.4-Fargate-ALB/)

---

[Tiếp tục đến 4.6 CI/CD](../4.6-CICD/)

## Kết luận

Sau phần này, tầng container của SpendWise sẽ sẵn sàng để đứng sau load balancer và làm việc cùng các phần còn lại của hệ thống.
