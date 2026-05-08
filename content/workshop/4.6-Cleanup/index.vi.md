
## Overview

Sau khi hoàn thành workshop SpendWise, việc dọn dẹp tài nguyên là bước tối quan trọng để tránh các chi phí phát sinh ngoài ý muốn từ AWS. Một số tài nguyên như NAT Instances, ALB, và RDS instances sẽ tính phí theo giờ ngay cả khi không có lưu lượng truy cập.

## What You Will Learn

- Hiểu đúng thứ tự xóa tài nguyên để tránh lỗi phụ thuộc
- Dọn dẹp ECS, ALB, RDS, và VPC resources
- Xóa Amplify frontend và Secrets Manager credentials
- Xóa IAM roles và CloudWatch logs
- Hiểu về mức chi phí phát sinh từ các dịch vụ AWS

## Requirements

- Hoàn thành toàn bộ các phần của workshop
- Quyền truy cập AWS Console với quyền administrator
- Hiểu về phụ thuộc giữa các tài nguyên AWS

## Content

﻿Sau khi hoàn thành workshop SpendWise, việc dọn dẹp tài nguyên là bước tối quan trọng để tránh các chi phí phát sinh ngoài ý muốn từ AWS. Một số tài nguyên như NAT Instances, ALB, và RDS instances sẽ tính phí theo giờ ngay cả khi không có lưu lượng truy cập.

> [!IMPORTANT]
> Tổng chi phí duy trì các tài nguyên SpendWise khoảng **$69-$326/tháng**. Hãy thực hiện các bước dưới đây ngay khi bạn không còn nhu cầu thử nghiệm để tránh chi phí không cần thiết.

## Thứ tự dọn dẹp tài nguyên

Để tránh lỗi "Resource in use", bạn nên thực hiện việc xóa theo thứ tự từ lớp ứng dụng ra đến lớp hạ tầng mạng.

### 1. Lớp Ứng dụng & Compute (ECS & ALB)

1. **ECS Service**: Vào ECS Cluster -> chọn Service `spendwise-api-service` -> nhấn **Delete**. Đợi cho các Task dừng hẳn.
2. **ECS Cluster**: Sau khi Service đã xóa xong, bạn có thể xóa Cluster.
3. **Application Load Balancer (ALB)**: Vào phần EC2 -> Load Balancers -> Chọn ALB của workshop -> **Actions** -> **Delete**.
4. **Target Group**: Xóa Target Group tương ứng của ALB.

### 2. Lớp Cơ sở dữ liệu (RDS)

> [!IMPORTANT]
> **Xóa RDS trước tiên** trước khi xóa VPC, vì RDS phải tồn tại trong một VPC subnet.

1. **RDS Instance**: Vào RDS Console -> Databases -> Chọn instance `spendwise-db` -> nhấn **Delete**.
2. **Snapshots** (Tùy chọn): Nếu bạn có snapshot dự phòng, bạn có thể xóa chúng ở đây để tiết kiệm chi phí lưu trữ.
3. **DB Subnet Group**: Sau khi RDS bị xóa, vào Subnet Groups -> Xóa nhóm được liên kết.

### 3. Lớp Hạ tầng Mạng (VPC & NAT)

1. **NAT Instances**: Vào EC2 Console -> Instances -> Chọn các NAT Instance -> **Terminate instance**.
2. **VPC**: Vào VPC Console -> Your VPCs -> Chọn `spendwise-api-vpc` -> **Actions** -> **Delete VPC**. 
    - *Lưu ý: AWS sẽ tự động xóa Subnets, Internet Gateways, và Route Tables đi kèm.*

### 4. Lớp Frontend & Identity (Amplify & Cognito)

1. **AWS Amplify**: Vào Amplify Console -> Chọn ứng dụng SpendWise -> **Actions** -> **Delete app**. Việc này sẽ xóa frontend hosting và CI/CD pipeline.
2. **Amazon Cognito**: Vào Cognito Console -> User Pools -> Chọn `spendwise-user-pool` -> **Delete**. Xác nhận xóa (lưu ý: hành động này không thể hoàn tác).
3. **Secrets Manager**: Vào Secrets Manager -> Chọn secret chứa database credentials và API keys -> **Delete secret**. (Lưu ý AWS mặc định sẽ giữ secret 7-30 ngày trước khi xóa hẳn).

### 5. IAM & Monitoring (CloudWatch)

1. **IAM Roles**: Xóa các Role đã tạo thủ công như `ecsTaskRole`, `ecsTaskExecutionRole` nếu bạn không còn dùng cho dự án khác.
2. **CloudWatch Logs**: Xóa các Log Groups (`/ecs/spendwise-api`) để làm sạch giao diện quản lý.
3. **CloudWatch Alarms**: Vào CloudWatch -> Alarms -> Xóa bất kỳ budget hoặc monitoring alarm nào bạn đã tạo.

---

## Conclusion

Chúc mừng bạn đã hoàn thành trọn vẹn workshop triển khai hệ thống SpendWise trên AWS! Bằng cách tuân theo các bước dọn dẹp này, bạn đã an toàn loại bỏ tất cả tài nguyên và tránh được chi phí không cần thiết. Những kiến thức về kiến trúc 3-tier, Infrastructure as Code (Terraform), containerization (ECS Fargate), và quản lý cơ sở dữ liệu (RDS) sẽ vô cùng quý giá cho các dự án cloud của bạn trong tương lai.

Nền tảng SpendWise minh chứng cách xây dựng một ứng dụng tài chính cấp độ sản xuất với tính bảo mật, khả năng mở rộng và hiệu quả chi phí.

[Quay lại trang chủ](../../)
