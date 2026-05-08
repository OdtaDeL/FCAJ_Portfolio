
## Overview

Phần này bao gồm việc thiết lập kết nối cơ sở dữ liệu PostgreSQL thông qua Amazon RDS và định nghĩa các TypeORM entities cho các mô hình dữ liệu của SpendWise. Bạn sẽ tạo entities cho Users, Transactions, Budgets, và Categories.

## What You Will Learn

- Kết nối NestJS đến Amazon RDS PostgreSQL.
- Định nghĩa TypeORM entities và mối quan hệ giữa chúng.
- Tạo database migrations.
- Hiểu các mối quan hệ giữa entities (One-to-Many, Many-to-Many).
- Thiết lập connection pooling cho production.

## Requirements

- Hoàn thành phần 4.4.1 Authentication setup.
- Amazon RDS PostgreSQL instance đang chạy trong private VPC subnet.
- Database credentials được lưu trữ trong AWS Secrets Manager.
- Hiểu biết về thiết kế cơ sở dữ liệu quan hệ.

## Content

## Lớp dữ liệu - PostgreSQL & TypeORM

SpendWise sử dụng Amazon RDS PostgreSQL như là kho lưu trữ dữ liệu chính. TypeORM cung cấp một lớp ORM type-safe ánh xạ các bảng cơ sở dữ liệu tới các TypeScript entities.

### 1. Tạo kết nối cơ sở dữ liệu (`database/database.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: false, // Sử dụng migrations thay vì
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
```

### 2. Định nghĩa các Core Entities

**User Entity** (`entities/user.entity.ts`):

```typescript
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Budget } from './budget.entity';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string; // Từ Cognito sub

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];
}
```

**Transaction Entity** (`entities/transaction.entity.ts`):

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: 'income' | 'expense';

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

**Budget Entity** (`entities/budget.entity.ts`):

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.budgets, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category)
  category: Category;

  @Column('decimal', { precision: 10, scale: 2 })
  limit: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  spent: number;

  @Column()
  month: string; // Định dạng: YYYY-MM
}
```

**Category Entity** (`entities/category.entity.ts`):

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  icon: string;

  @Column('boolean', { default: false })
  isSystem: boolean; // Hệ thống categories vs user-defined
}
```

---

## Entity Relationships

| Entity | Mối Quan Hệ | Mục Đích |
|--------|------------|---------|
| User → Transactions | One-to-Many | Mỗi user có nhiều giao dịch |
| User → Budgets | One-to-Many | Mỗi user có thể đặt nhiều budget |
| Transaction → Category | Many-to-One | Nhiều giao dịch chia sẻ một category |
| Budget → Category | Many-to-One | Budget theo dõi chi tiêu theo category |

---

## Kết Luận

PostgreSQL database của bạn giờ đã được kết nối thông qua TypeORM, và các entities đại diện cho các mô hình dữ liệu tài chính cơ bản của SpendWise: Users, Transactions, Budgets, và Categories.
