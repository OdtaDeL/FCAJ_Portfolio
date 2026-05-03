## Overview

SpendWise là một ứng dụng web quản lý tài chính cá nhân hiện đại, giúp người dùng theo dõi và phân tích chi tiêu một cách trực quan. Hệ thống được triển khai trên AWS Cloud theo kiến trúc **3-tier**, đảm bảo tính bảo mật cao thông qua mạng riêng (VPC), xác thực người dùng tập trung (Cognito) và quản lý hạ tầng bằng mã nguồn (IaC).

## What You Will Learn

* Cách thiết lập hạ tầng mạng an toàn với **Amazon VPC**, chia Subnet Public/Private và cấu hình **VPC Endpoints**.
* Triển khai ứng dụng container hóa bằng **Amazon ECS Fargate** kết hợp với **Application Load Balancer (ALB)**.
* Quản lý định danh và xác thực người dùng với **Amazon Cognito**.
* Vận hành và kết nối cơ sở dữ liệu quan hệ **Amazon RDS** trong mạng nội bộ an toàn.
* Tự động hóa triển khai Frontend bằng **AWS Amplify** và bảo mật ứng dụng với **AWS WAF** & **Secrets Manager**.

## Requirements

* Tài khoản AWS (Free Tier hoặc có hạn mức sử dụng).
* Kiến thức cơ bản về **NextJS** (Frontend) và **NestJS** (Backend).
* Đã cài đặt Git và Terraform (để triển khai hạ tầng dạng mã nguồn).

## Content

# SpendWise — Workshop Triển Khai Full-Stack Trên AWS

## Tổng quan
Hướng dẫn này cung cấp quy trình từng bước hoàn chỉnh để triển khai **SpendWise** — hệ thống quản lý và phân tích tài chính cá nhân trên AWS. Workshop tập trung vào việc xây dựng hạ tầng vững chắc bằng **Terraform**, sử dụng **Amazon Cognito** để quản lý danh tính và **Amazon ECS Fargate** để vận hành backend serverless. Dữ liệu tài chính được lưu trữ an toàn trong **Amazon RDS** đặt tại subnet riêng tư, kết nối với frontend **NextJS** thông qua **AWS Amplify**. Toàn bộ giải pháp được thiết kế để chịu tải linh hoạt, bảo mật tuyệt đối qua lớp chặn **AWS WAF** và quản lý khóa tập trung bằng **Secrets Manager**.

## Nội dung thực hành

1. [Tổng quan & Kiến trúc](4.1-Overview/)
2. [Thiết lập VPC & Terraform Foundation](4.2-Infrastructure/)
3. [Triển khai Identity với Amazon Cognito](4.3-Cognito/)
4. [Container hóa Backend & ECS Fargate](4.4-Backend-ECS/)
5. [Cấu hình Amazon RDS & Cơ sở dữ liệu](4.5-Database/)
6. [Triển khai Frontend Amplify & HTTPS](4.6-Frontend/)
7. [Giám sát CloudWatch & Dọn dẹp](4.7-Cleanup/)

## Ước tính chi phí

Dưới đây là bảng ước tính chi phí duy trì hệ thống SpendWise trên AWS dựa trên cấu hình đề xuất.

| Dịch vụ               | Chi phí tháng (Ước tính) | Chi phí/Ngày |
|-----------------------|-------------------------:|-------------:|
| Application Load Balancer (ALB) | $26.00                | $0.866       |
| Amazon ECS Fargate    | $17.00                   | $0.566       |
| Amazon RDS PostgreSQL | $23.50                   | $0.783       |
| Amazon VPC Endpoints  | $45.00                   | $1.500       |
| AWS WAF               | $6.00                    | $0.200       |
| AWS Amplify           | $4.50                    | $0.150       |
| AWS Secrets Manager   | $1.20                    | $0.040       |
| Amazon Route 53       | $0.90                    | $0.030       |
| **Tổng cộng**         | **$124.10**              | **$4.135**   |

---

## Conclusion

Bằng cách hoàn thành workshop này, bạn sẽ sở hữu một hệ thống quản lý tài chính **SpendWise** đạt chuẩn doanh nghiệp trên AWS. Giải pháp không chỉ giải quyết bài toán hiệu năng và mở rộng mà còn đặt nền móng vững chắc về bảo mật dữ liệu tài chính cho người dùng cuối.