---
title: Data Layer
slug: /workshop/4.4-backend/
description: Workshop content: setting up the SpendWise PostgreSQL data layer with TypeORM.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

This section covers setting up the PostgreSQL database connection via Amazon RDS and defining TypeORM entities for SpendWise data models. You'll create entities for Users, Transactions, Budgets, and Categories.

## What You Will Learn

- Connect NestJS to Amazon RDS PostgreSQL.
- Define TypeORM entities and relationships.
- Create database migrations.
- Understand entity relationships (One-to-Many, Many-to-One).
- Set up connection pooling for production.

## Requirements

- Completed 4.4.1 Authentication setup.
- Amazon RDS PostgreSQL instance running in a private VPC subnet.
- Database credentials stored in AWS Secrets Manager.
- Understanding of relational database design.

## Content

## Data Layer - PostgreSQL & TypeORM

SpendWise uses Amazon RDS PostgreSQL as the primary data store. TypeORM provides a type-safe ORM layer that maps database tables to TypeScript entities.

### 1. Create Database Connection (`database/database.module.ts`)

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
        synchronize: false,
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
```

### 2. Define Core Entities

**User Entity** (`entities/user.entity.ts`):

```typescript
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Budget } from './budget.entity';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

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
  month: string;
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
  isSystem: boolean;
}
```

### 3. Register Entities in AppModule

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { User } from './entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { Budget } from './entities/budget.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Transaction, Budget, Category]),
  ],
})
export class AppModule {}
```

### 4. Create Database Migrations

```bash
npx typeorm migration:create ./migrations/InitialSchema
```

Edit the migration file to set up the schema:

```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1000000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'username', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```

Run migrations:

```bash
npx typeorm migration:run
```

---

## Entity Relationships

| Entity | Relationship | Purpose |
|--------|--------------|---------|
| User → Transactions | One-to-Many | Each user has multiple transactions |
| User → Budgets | One-to-Many | Each user can set multiple budgets |
| Transaction → Category | Many-to-One | Many transactions share one category |
| Budget → Category | Many-to-One | Budget tracks spending by category |

---

## Next Steps

With the database schema defined, move to [Storage Layer](../4.4.3-Storage/) to configure credential management and environment variables.

## Conclusion

Your PostgreSQL database is now connected via TypeORM, and entities represent the core financial data models of SpendWise: Users, Transactions, Budgets, and Categories.