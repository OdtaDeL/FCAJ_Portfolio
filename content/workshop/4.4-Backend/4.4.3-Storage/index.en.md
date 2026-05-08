

## Overview

This section covers managing secrets, environment variables, and sensitive credentials for SpendWise. You'll configure AWS Secrets Manager, environment files, and secure credential handling for database connections, API keys, and Cognito settings.

## What You Will Learn

- Store and retrieve secrets from AWS Secrets Manager.
- Configure environment variables for different deployment environments.
- Implement secure credential injection in NestJS.
- Handle database credentials, JWT secrets, and API keys securely.
- Prepare for ECS deployment with environment variable management.

## Requirements

- Completed 4.4.2 Data Layer setup.
- AWS CLI with Secrets Manager access.
- Understanding of NestJS ConfigService.
- Knowledge of environment variable management.

## Content

## Storage & Configuration Layer

SpendWise backend requires secure credential management for:
- PostgreSQL RDS database connections
- Cognito User Pool credentials
- JWT signing secrets
- AWS service API keys

### 1. Create Secrets in AWS Secrets Manager

```bash
# Store database credentials
aws secretsmanager create-secret \
  --name spendwise/db/credentials \
  --secret-string '{
    "host": "rds-instance.amazonaws.com",
    "port": 5432,
    "username": "admin",
    "password": "your-secure-password",
    "database": "spendwise"
  }'

# Store Cognito settings
aws secretsmanager create-secret \
  --name spendwise/cognito/config \
  --secret-string '{
    "userPoolId": "us-east-1_xxx",
    "clientId": "xxx",
    "region": "us-east-1"
  }'

# Store JWT secret
aws secretsmanager create-secret \
  --name spendwise/jwt/secret \
  --secret-string 'your-jwt-secret-key'
```

### 2. Create `.env.local` for Development

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

### 3. Create `.env.production` for ECS

```env
# Server
NODE_ENV=production
PORT=3000

# Database (from RDS endpoint in private subnet)
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

### 4. Create Config Service (`config/database.config.ts`)

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

### 5. Create Secrets Manager Service (`services/secrets.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsService {
  private client = new SecretsManagerClient({
    region: process.env.AWS_REGION,
  });

  constructor(private configService: ConfigService) {}

  async getSecret(secretName: string): Promise<any> {
    if (!this.configService.get('SECRETS_MANAGER_ENABLED')) {
      return null; // Use .env values instead
    }

    try {
      const response = await this.client.send(
        new GetSecretValueCommand({ SecretId: secretName }),
      );
      return JSON.parse(response.SecretString);
    } catch (error) {
      console.error(`Failed to retrieve secret: ${secretName}`, error);
      throw error;
    }
  }

  async getDbCredentials() {
    return this.getSecret(
      this.configService.get('SECRETS_DB_NAME') || 'spendwise/db/credentials',
    );
  }

  async getCognitoConfig() {
    return this.getSecret(
      this.configService.get('SECRETS_COGNITO_NAME') ||
        'spendwise/cognito/config',
    );
  }

  async getJwtSecret() {
    return this.getSecret(
      this.configService.get('SECRETS_JWT_NAME') || 'spendwise/jwt/secret',
    );
  }
}
```

### 6. Register in AppModule

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretsService } from './services/secrets.service';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.local',
      load: [databaseConfig],
    }),
  ],
  providers: [SecretsService],
  exports: [SecretsService],
})
export class AppModule {}
```

---

## Security Best Practices

| Practice | Implementation |
|----------|----------------|
| **Never commit secrets** | Use `.env.local` in `.gitignore` |
| **Rotate credentials** | Use AWS Secrets Manager rotation policies |
| **Encrypt in transit** | Always use HTTPS/TLS for API calls |
| **Principle of least privilege** | IAM roles should only access needed secrets |
| **Audit logging** | Enable CloudTrail for secret access tracking |

---

## Next Steps

With storage and configuration configured, move to [API Functions](../4.4.4-Functions/) to build the endpoints that power SpendWise transactions, budgets, and user management.

## Conclusion

Your NestJS backend now securely manages database credentials, API keys, and configuration through AWS Secrets Manager and environment variables. This setup enables safe deployment to ECS while keeping sensitive data protected.

