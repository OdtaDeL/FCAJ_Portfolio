
## Overview

This section covers setting up the PostgreSQL database connection via Amazon RDS and defining TypeORM entities for SpendWise data models. You'll create entities for Users, Transactions, Budgets, and Categories.

## What You Will Learn

- Connect NestJS to Amazon RDS PostgreSQL.
- Define TypeORM entities and relationships.
- Create database migrations.
- Understand entity relationships (One-to-Many, Many-to-Many).
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
        synchronize: false, // Use migrations instead
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
  id: string; // From Cognito sub

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
  month: string; // Format: YYYY-MM
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
  isSystem: boolean; // System categories vs user-defined
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
    // Create other tables similarly
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    // Drop other tables
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

  Macros: a.customType({
    calories: a.float(),
    protein_g: a.float(),
    carbs_g: a.float(),
    fat_g: a.float(),
    saturated_fat_g: a.float(),
    polyunsaturated_fat_g: a.float(),
    monounsaturated_fat_g: a.float(),
    fiber_g: a.float(),
    sugar_g: a.float(),
    sodium_mg: a.float(),
    cholesterol_mg: a.float(),
    potassium_mg: a.float(),
  }),

  Food: a
    .model({
      food_id: a.string().required(),
      name_vi: a.string().required(),
      name_en: a.string(),
      aliases_vi: a.string().array(),
      aliases_en: a.string().array(),
      macros: a.ref('Macros'),
      micronutrients: a.ref('Micronutrients'),
      serving: a.ref('Serving'),
      verified: a.boolean(),
      source: a.string(),
    })
    .identifier(['food_id'])
    .secondaryIndexes((index) => [
      index('name_vi'),
      index('name_en'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read'])
    ]),

  //========================================
  // User Database
  //========================================
  biometric: a.customType({
    age: a.integer(),
    gender: a.string(),
    height_cm: a.float(),
    weight_kg: a.float(),
    active_level: a.string(),
  }),

  goal: a.customType({
    daily_calories: a.float(),
    daily_carbs_g: a.float(),
    daily_protein_g: a.float(),
    daily_fat_g: a.float(),
    target_weight_kg: a.float(), 
  }),

  dietary_profile: a.customType({
    allergies: a.string().array(),
    preferences: a.string().array(),
  }),

  gamification: a.customType({
    current_streak: a.integer(),
    longest_streak: a.integer(),
    last_log_date: a.string(),
    total_points: a.integer(),
  }),

  ai_preferences: a.customType({
    coach_tone: a.string(),
  }),

  user: a
    .model({
      user_id: a.string().required(),
      email: a.string().required(),
      display_name: a.string(),
      avatar_url: a.string(),
      created_at: a.string(),
      updated_at: a.string(),
      last_active_at: a.string(),
      onboarding_status: a.boolean(),
      friend_code: a.string(),
      ai_context_summary: a.string(),
      biometric: a.ref('biometric'),
      goal: a.ref('goal'),
      dietary_profile: a.ref('dietary_profile'),
      gamification: a.ref('gamification'),
      ai_preferences: a.ref('ai_preferences'),
    })
    .identifier(['user_id'])
    .secondaryIndexes((index) => [
      index('friend_code'),
    ])
    .authorization((allow) => [
      allow.owner(),
    ]),


  //========================================
  // Food Logs (Meal History)
  //========================================
  LogMacros: a.customType({
    calories: a.float(),
    protein_g: a.float(),
    carbs_g: a.float(),
    fat_g: a.float(),
    fiber_g: a.float(),
    sugar_g: a.float(),
    sodium_mg: a.float(),
  }),

  LogIngredient: a.customType({
    name: a.string(),
    weight_g: a.float(),
  }),

  FoodLog: a
    .model({
      date: a.string().required(),
      timestamp: a.datetime().required(),
      food_id: a.string(),
      food_name: a.string().required(),
      meal_type: a.enum(['breakfast', 'lunch', 'dinner', 'snack']),
      portion: a.float(),
      portion_unit: a.string(),
      additions: a.string().array(),
      ingredients: a.json().array(),
      macros: a.ref('LogMacros'),
      micronutrients: a.ref('Micronutrients'),
      input_method: a.enum(['voice', 'photo', 'manual', 'barcode']),
      image_key: a.string(),
    })
    .secondaryIndexes((index) => [
      index('date'),
    ])
    .authorization((allow) => [
      allow.owner(),
    ]),

  //========================================
  // Fridge Inventory
  //========================================
  FridgeItem: a
    .model({
      name: a.string().required(),
      food_id: a.string(),
      quantity: a.float(),
      unit: a.string(),
      added_date: a.datetime(),
      expiry_date: a.string(),
      category: a.enum(['meat', 'vegetable', 'fruit', 'dairy', 'pantry', 'other']),
      emoji: a.string(),
      calories: a.float(),
      protein_g: a.float(),
      carbs_g: a.float(),
      fat_g: a.float(),
    })
    .authorization((allow) => [
      allow.owner(),
    ]),

//========================================
  // Friendships
  //========================================
  Friendship: a
    .model({
      friend_id: a.string().required(),
      friend_code: a.string(),
      friend_name: a.string(),
      friend_avatar: a.string(),
      status: a.enum(['pending', 'accepted', 'blocked']),
      direction: a.enum(['sent', 'received']),
      linked_id: a.string(),
    })
    .secondaryIndexes((index) => [
      index('friend_id'),
    ])
    .authorization((allow) => [
      allow.owner(),
    ]),

  //========================================
  // User Public Stats (readable by friends)
  //========================================
  UserPublicStats: a
    .model({
      user_id: a.string().required(),
      display_name: a.string(),
      avatar_url: a.string(),
      current_streak: a.integer(),
      longest_streak: a.integer(),
      pet_score: a.integer(),
      pet_level: a.integer(),
      total_log_days: a.integer(),
      last_log_date: a.string(),
    })
    .identifier(['user_id'])
    .authorization((allow) => [
      allow.owner().to(['create', 'update', 'delete', 'read']),
      allow.authenticated().to(['read']),
    ]),

  //========================================
  // AI Engine (Bedrock)
  //========================================
  aiEngine: a
    .query()
    .arguments({
      action: a.string().required(),
      payload: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(aiEngine))
    .authorization((allow) => [allow.authenticated()]),

  //========================================
  // Scan Image (proxy to ECS for photo analysis)
  //========================================
  scanImage: a
    .query()
    .arguments({
      action: a.string().required(),
      payload: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(scanImage))
    .authorization((allow) => [allow.authenticated()]),

  //========================================
  // Process Nutrition (DB verify + AI fallback)
  //========================================
  processNutrition: a
    .query()
    .arguments({ payload: a.string().required() })
    .returns(a.string())
    .handler(a.handler.function(processNutrition))
    .authorization((allow) => [allow.authenticated()]),

  //========================================
  // Friend Request (send/accept/decline/remove/block)
  //========================================
  friendRequest: a
    .mutation()
    .arguments({
      action: a.string().required(),
      payload: a.string().required(),
    })
    .returns(a.string())
    .handler(a.handler.function(friendRequest))
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
```

![appsync-console-schema.png](/images/appsync-console-schema.png)
![appsync-queries-playground.png](/images/appsync-queries-playground.png)
![food-item-structure.png](/images/food-item-structure.png)
![dynamodb-tables-list.png](/images/dynamodb-tables-list.png)

---

[Continue to 4.4.3 Storage Layer (Storage)](../4.4.3-Storage/)

## Conclusion

_TBD._
