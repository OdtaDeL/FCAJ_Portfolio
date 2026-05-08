
## Overview

Phần này bao gồm việc tích hợp Amazon Cognito với backend NestJS của bạn để xác thực dựa trên JWT. Bạn sẽ tạo auth guards, decorators, và các phương thức service để bảo vệ các endpoint API của bạn.

## What You Will Learn

- Cấu hình xác thực JWT từ Cognito trong NestJS.
- Tạo auth guards để bảo vệ các endpoints.
- Implement custom decorators để trích xuất user claims.
- Thiết lập JWT middleware để xác minh token.
- Hiểu luồng: Token Verification → User Claims → Protected Routes.

## Requirements

- Hoàn thành phần 4.4 Backend Setup.
- Cognito User Pool đã được tạo và cấu hình.
- JWT tokens được phát hành từ Cognito.
- Hiểu biết về NestJS Guards và Passport.js.

## Content

## Tích hợp lớp xác thực

SpendWise sử dụng Amazon Cognito như là nhà cung cấp danh tính tập trung. Backend xác thực các JWT tokens được phát hành bởi Cognito và sử dụng chúng để phê duyệt các yêu cầu API.

### 1. Tạo Auth Module

```bash
nest g module auth
nest g service auth
```

### 2. Cấu hình Passport Strategy (`auth/strategies/jwt.strategy.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: \`https://cognito-idp.\${process.env.AWS_REGION}.amazonaws.com/\${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json\`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.COGNITO_CLIENT_ID,
      algorithms: ['RS256'],
    });
  }

  validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.cognito:username,
    };
  }
}
```

### 3. Tạo JWT Auth Guard (`auth/guards/jwt-auth.guard.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 4. Tạo Custom Decorator (`auth/decorators/current-user.decorator.ts`)

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

### 5. Đăng ký Auth Module trong `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PassportModule,
    JwtModule.register({ global: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
```

### 6. Bảo vệ các routes bằng Guard

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CurrentUser } from './auth/decorators/current-user.decorator';

@Controller('api/transactions')
export class TransactionsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getTransactions(@CurrentUser() user: any) {
    return { userId: user.userId, message: 'Your transactions' };
  }
}
```

---

## Các khái niệm chính

| Khái Niệm | Mục đích |
|---------|---------|
| **JWT Token** | Token được ký bởi Cognito chứa các user claims |
| **JWKS Endpoint** | Các public keys của Cognito để xác minh chữ ký token |
| **Passport Strategy** | Lớp tích hợp NestJS để xác thực token |
| **Auth Guard** | Middleware kiểm tra JWT hợp lệ trước khi thực thi route |
| **Custom Decorator** | Trích xuất thông tin user xác thực từ request context |

---

## Bước tiếp theo

Khi xác thực được cấu hình, bạn có thể chuyển sang [Data Layer](../4.4.2-Data/) để thiết lập kết nối cơ sở dữ liệu và các entities tham chiếu đến user đã xác thực.

## Kết Luận

Backend NestJS của bạn giờ đây xác thực các JWT tokens từ Cognito và bảo vệ các endpoints. Tất cả các yêu cầu xác thực bao gồm các user claims (userId, email) được trích xuất từ JWT token.
  },

  userAttributes: {
    email: {
      required: true
    },
    preferredUsername: {
      required: false
    }
  },
});

```

---

## Thiết lập Secret cho Google OAuth

Vì chúng ta sử dụng `secret()` trong mã nguồn, bạn cần nạp các giá trị này vào AWS Amplify trước khi triển khai. Chạy các lệnh sau trong terminal tại thư mục backend:

```bash
npx ampx secret set GOOGLE_CLIENT_ID
npx ampx secret set GOOGLE_CLIENT_SECRET
```

Hệ thống sẽ yêu cầu bạn nhập giá trị cho từng biến (lấy từ Google Cloud Console).

![cognito-user-pool.png](/images/cognito-user-pool.png)

---

[Tiếp tục đến 4.4.2 Lớp Dữ liệu (Data)](../4.4.2-Data/)

## Conclusion

_TBD._
