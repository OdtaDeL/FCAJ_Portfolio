
## Overview

Phần này bao gồm việc quản lý secrets, biến môi trường, và credentials nhạy cảm cho SpendWise. Bạn sẽ cấu hình AWS Secrets Manager, các tệp environment, và xử lý credentials an toàn cho kết nối database, API keys, và cài đặt Cognito.

## What You Will Learn

- Lưu trữ và lấy secrets từ AWS Secrets Manager.
- Cấu hình biến môi trường cho các environment triển khai khác nhau.
- Implement secure credential injection trong NestJS.
- Xử lý database credentials, JWT secrets, và API keys một cách an toàn.
- Chuẩn bị cho triển khai ECS với quản lý biến môi trường.

## Requirements

- Hoàn thành phần 4.4.2 Data Layer setup.
- AWS CLI với quyền truy cập Secrets Manager.
- Hiểu biết về NestJS ConfigService.
- Kiến thức về quản lý biến môi trường.

## Content

## Lớp Lưu trữ & Cấu hình

Backend của SpendWise yêu cầu quản lý credentials an toàn cho:
- Kết nối cơ sở dữ liệu PostgreSQL RDS
- Credentials Cognito User Pool
- JWT signing secrets
- AWS service API keys

### 1. Tạo Secrets trong AWS Secrets Manager

```bash
# Lưu database credentials
aws secretsmanager create-secret \
  --name spendwise/db/credentials \
  --secret-string '{
    "host": "rds-instance.amazonaws.com",
    "port": 5432,
    "username": "admin",
    "password": "your-secure-password",
    "database": "spendwise"
  }'

# Lưu cài đặt Cognito
aws secretsmanager create-secret \
  --name spendwise/cognito/config \
  --secret-string '{
    "userPoolId": "us-east-1_xxx",
    "clientId": "xxx",
    "region": "us-east-1"
  }'

# Lưu JWT secret
aws secretsmanager create-secret \
  --name spendwise/jwt/secret \
  --secret-string 'your-jwt-secret-key'
```

### 2. Tạo `.env.local` cho Development

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=spendwise

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret

# Cognito
COGNITO_USER_POOL_ID=us-east-1_xxx
COGNITO_CLIENT_ID=xxx
COGNITO_REGION=us-east-1

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=3600

# Secrets Manager
SECRETS_MANAGER_ENABLED=false  # Local development
```

### 3. Tạo `.env.production` cho ECS

```env
# Server
NODE_ENV=production
PORT=3000

# Database (từ RDS endpoint trong private subnet)
DB_HOST={{DB_HOST}}  # Injected by ECS task definition
DB_PORT=5432
DB_USER={{DB_USER}}
DB_PASSWORD={{DB_PASSWORD}}
DB_NAME=spendwise

# AWS
AWS_REGION=us-east-1

# Cognito
COGNITO_USER_POOL_ID={{COGNITO_USER_POOL_ID}}
COGNITO_CLIENT_ID={{COGNITO_CLIENT_ID}}
COGNITO_REGION=us-east-1

# JWT
JWT_SECRET={{JWT_SECRET}}
JWT_EXPIRATION=3600

# Secrets Manager
SECRETS_MANAGER_ENABLED=true
SECRETS_DB_NAME=spendwise/db/credentials
SECRETS_COGNITO_NAME=spendwise/cognito/config
SECRETS_JWT_NAME=spendwise/jwt/secret
```

### 4. Tạo Config Service (`config/database.config.ts`)

```typescript
import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  logging: process.env.NODE_ENV === 'development',
}));
```

---

## Best Practices Bảo Mật

| Thực Hành | Triển Khai |
|----------|-----------|
| **Không commit secrets** | Sử dụng `.env.local` trong `.gitignore` |
| **Rotate credentials** | Sử dụng AWS Secrets Manager rotation policies |
| **Mã hóa trong quá trình truyền** | Luôn dùng HTTPS/TLS cho API calls |
| **Nguyên tắc least privilege** | IAM roles chỉ nên truy cập secrets cần thiết |
| **Audit logging** | Enable CloudTrail để theo dõi truy cập secrets |

---

## Bước tiếp theo

Với storage và configuration được cấu hình, chuyển sang [API Functions](../4.4.4-Functions/) để xây dựng các endpoints cung cấp chức năng transactions, budgets, và quản lý users của SpendWise.

## Kết Luận

Backend NestJS của bạn giờ đã quản lý an toàn database credentials, API keys, và configuration thông qua AWS Secrets Manager và biến môi trường. Thiết lập này cho phép triển khai an toàn lên ECS trong khi bảo vệ dữ liệu nhạy cảm.
