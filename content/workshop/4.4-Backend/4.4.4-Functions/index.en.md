

## Overview

This section covers building the core API endpoints for SpendWise using NestJS controllers and services. You'll implement endpoints for transaction management, budget tracking, and category operations.

## What You Will Learn

- Create NestJS controllers for REST API endpoints.
- Implement services containing business logic.
- Handle CRUD operations for Transactions, Budgets, and Categories.
- Use dependency injection and decorators.
- Implement error handling and validation.

## Requirements

- Completed 4.4.3 Storage & Configuration setup.
- Understanding of NestJS architecture (Controllers, Services, Modules).
- Knowledge of REST API design principles.
- Familiarity with TypeORM repositories.

## Content

## API Endpoints Layer

SpendWise backend exposes REST endpoints for managing financial data. The architecture follows NestJS best practices with separation of concerns: Controllers handle HTTP requests, Services contain business logic, and Repositories manage database operations.

### 1. Transaction Controller & Service

**Controller** (`controllers/transactions.controller.ts`):

```typescript
import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Controller('api/transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(@CurrentUser() user: any) {
    return this.transactionsService.getUserTransactions(user.userId);
  }

  @Post()
  async createTransaction(
    @CurrentUser() user: any,
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionsService.createTransaction(user.userId, dto);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    return this.transactionsService.deleteTransaction(id);
  }
}
```

**Service** (`services/transactions.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async getUserTransactions(userId: string) {
    return this.transactionRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async createTransaction(userId: string, dto: any) {
    const transaction = this.transactionRepo.create({
      user: { id: userId },
      amount: dto.amount,
      type: dto.type,
      description: dto.description,
      category: dto.categoryId ? { id: dto.categoryId } : null,
    });
    return this.transactionRepo.save(transaction);
  }

  async deleteTransaction(id: string) {
    return this.transactionRepo.delete(id);
  }
}
```

### 2. Budget Controller & Service

**Controller** (`controllers/budgets.controller.ts`):

```typescript
import { Controller, Get, Post, Body, UseGuards, Put, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BudgetsService } from '../services/budgets.service';

@Controller('api/budgets')
@UseGuards(JwtAuthGuard)
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  async getBudgets(@CurrentUser() user: any) {
    return this.budgetsService.getUserBudgets(user.userId);
  }

  @Post()
  async createBudget(@CurrentUser() user: any, @Body() dto: any) {
    return this.budgetsService.createBudget(user.userId, dto);
  }

  @Put(':id')
  async updateBudget(@Param('id') id: string, @Body() dto: any) {
    return this.budgetsService.updateBudget(id, dto);
  }
}
```

### 3. Category Controller & Service

**Controller** (`controllers/categories.controller.ts`):

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoriesService } from '../services/categories.service';

@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getAllCategories();
  }
}
```

### 4. Register Endpoints in AppModule

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './controllers/transactions.controller';
import { BudgetsController } from './controllers/budgets.controller';
import { CategoriesController } from './controllers/categories.controller';
import { TransactionsService } from './services/transactions.service';
import { BudgetsService } from './services/budgets.service';
import { CategoriesService } from './services/categories.service';
import { Transaction } from './entities/transaction.entity';
import { Budget } from './entities/budget.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Budget, Category])],
  controllers: [TransactionsController, BudgetsController, CategoriesController],
  providers: [TransactionsService, BudgetsService, CategoriesService],
})
export class FinanceModule {}
```

---

## API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/transactions` | GET | Retrieve all transactions for authenticated user |
| `/api/transactions` | POST | Create a new transaction |
| `/api/transactions/:id` | DELETE | Delete a transaction |
| `/api/budgets` | GET | Retrieve all budgets for user |
| `/api/budgets` | POST | Create a new budget |
| `/api/budgets/:id` | PUT | Update an existing budget |
| `/api/categories` | GET | Retrieve all expense categories |

---

## Next Steps

With API endpoints built and tested locally, you're ready to move to [ECS Fargate Deployment](../4.5-ECS-Fargate/) to containerize and deploy the backend.

## Conclusion

Your NestJS backend now exposes a complete REST API for SpendWise financial management. Controllers and Services follow best practices for testability, maintainability, and security with JWT-protected endpoints.

