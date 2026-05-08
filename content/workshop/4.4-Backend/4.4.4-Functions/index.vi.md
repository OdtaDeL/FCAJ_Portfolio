
## Overview

Phần này bao gồm việc xây dựng các core API endpoints cho SpendWise sử dụng NestJS controllers và services. Bạn sẽ implement các endpoints để quản lý giao dịch, theo dõi budget, và quản lý danh mục chi tiêu.

## What You Will Learn

- Tạo NestJS controllers cho các REST API endpoints.
- Implement services chứa business logic.
- Xử lý CRUD operations cho Transactions, Budgets, và Categories.
- Sử dụng dependency injection và decorators.
- Implement error handling và validation.

## Requirements

- Hoàn thành phần 4.4.3 Storage & Configuration setup.
- Hiểu biết về NestJS architecture (Controllers, Services, Modules).
- Kiến thức về thiết kế REST API.
- Quen thuộc với TypeORM repositories.

## Content

## Lớp API Endpoints

Backend của SpendWise expose các REST endpoints để quản lý dữ liệu tài chính. Kiến trúc tuân theo best practices của NestJS với phân chia trách nhiệm: Controllers xử lý HTTP requests, Services chứa business logic, và Repositories quản lý database operations.

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

---

## Tóm tắt API Endpoints

| Endpoint | Method | Mô Tả |
|----------|--------|-------|
| `/api/transactions` | GET | Lấy tất cả giao dịch của user |
| `/api/transactions` | POST | Tạo giao dịch mới |
| `/api/transactions/:id` | DELETE | Xóa một giao dịch |
| `/api/budgets` | GET | Lấy tất cả budgets của user |
| `/api/budgets` | POST | Tạo budget mới |
| `/api/budgets/:id` | PUT | Cập nhật budget |
| `/api/categories` | GET | Lấy tất cả danh mục chi tiêu |

---

## Bước tiếp theo

Với các API endpoints đã được xây dựng và kiểm tra local, bạn đã sẵn sàng chuyển sang [ECS Fargate Deployment](../4.5-ECS-Fargate/) để container hóa và triển khai backend.

## Kết Luận

Backend NestJS của bạn giờ đã expose một complete REST API cho SpendWise quản lý tài chính. Controllers và Services tuân theo best practices để dễ test, maintain, và bảo mật với JWT-protected endpoints.
