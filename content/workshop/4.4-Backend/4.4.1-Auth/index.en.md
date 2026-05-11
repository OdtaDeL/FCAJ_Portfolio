
## Overview

This section covers integrating Amazon Cognito with your NestJS backend for JWT-based authentication. You'll create auth guards, decorators, and service methods to protect your API endpoints.

## What You Will Learn

- Configure Cognito JWT validation in NestJS.
- Create auth guards to protect endpoints.
- Implement custom decorators for extracting user claims.
- Set up JWT middleware for token verification.
- Understand the flow: Token Verification → User Claims → Protected Routes.

## Requirements

- Completed 4.4 Backend Setup.
- Cognito User Pool already created and configured.
- JWT tokens issued by Cognito.
- Understanding of NestJS Guards and Passport.js.

## Content

## Authentication Layer Integration

SpendWise uses Amazon Cognito as the centralized identity provider. The backend validates JWT tokens issued by Cognito and uses them to authorize API requests.

### 1. Create the Auth Module

```bash
nest g module auth
nest g service auth
```

### 2. Configure Passport Strategy (`auth/strategies/jwt.strategy.ts`)

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

### 3. Create JWT Auth Guard (`auth/guards/jwt-auth.guard.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 4. Create Custom Decorator (`auth/decorators/current-user.decorator.ts`)

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

### 5. Register Auth Module in `app.module.ts`

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

### 6. Protect Routes Using the Guard

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

## Key Concepts

| Concept | Purpose |
|---------|---------|
| **JWT Token** | Signed token from Cognito containing user claims |
| **JWKS Endpoint** | Cognito's public keys for verifying token signatures |
| **Passport Strategy** | NestJS integration layer for token validation |
| **Auth Guard** | Middleware that checks for valid JWT before route execution |
| **Custom Decorator** | Extracts authenticated user info from request context |

---

## Next Steps

Once authentication is configured, you can move to the [Data Layer](../4.4.2-Data/) to set up database connections and entities that reference the authenticated user.

## Conclusion

Your NestJS backend now validates Cognito JWT tokens and protects endpoints. All authenticated requests include user claims (userId, email) extracted from the JWT token.

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

## Setting Secrets for Google OAuth

Since we're using `secret()` in the source code, you need to load these values ​​into AWS Amplify before deployment. Run the following commands in the terminal at the backend directory:

```bash
npx ampx secret set GOOGLE_CLIENT_ID
npx ampx secret set GOOGLE_CLIENT_SECRET
```

The system will prompt you to enter values ​​for each variable (taken from the Google Cloud Console).

![cognito-user-pool.png](/images/cognito-user-pool.png)
---

[Continue to 4.4.2 Data Layer (Data)](../4.4.2-Data/)

## Conclusion

Your NestJS backend now has a complete JWT authentication layer powered by Amazon Cognito. All API endpoints are protected by the `JwtAuthGuard`, and authenticated requests include user claims (userId, email) extracted from the JWT token. This architecture ensures that only valid, authenticated users can access your SpendWise API resources. The Passport-JWT strategy validates tokens using Cognito's public JWKS endpoint, and the custom `@CurrentUser()` decorator provides convenient access to user information in your controllers. You are now ready to implement the Data Layer (TypeORM entities and database integration) in the next section.
