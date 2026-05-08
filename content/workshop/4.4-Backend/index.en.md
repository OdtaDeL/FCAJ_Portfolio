---
title: Backend Setup
slug: /workshop/4.4-backend/
description: Workshop content: preparing the SpendWise backend foundation with NestJS and Docker.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

This section prepares the NestJS backend for SpendWise and containers it with Docker. The backend connects to Amazon Cognito for authentication, Amazon RDS PostgreSQL for data persistence, and Secrets Manager for secure credential management.

## What You Will Learn

- Initialize a NestJS project with TypeScript and TypeORM.
- Configure PostgreSQL connection to Amazon RDS.
- Integrate Amazon Cognito for JWT-based authentication.
- Set up environment variables and Secrets Manager.
- Create a Dockerfile and prepare for ECS deployment.
- Understand the separation of concerns: Auth, Data, Storage layers.

## Requirements

- Completed 4.3 Frontend Setup.
- Node.js 22.x LTS and npm 11+ or pnpm.
- AWS CLI configured with admin access.
- Docker installed locally.
- Basic knowledge of NestJS, TypeORM, and containerization.
- Familiarity with PostgreSQL and relational database concepts.

## Content

## Backend Initialization

SpendWise backend is built with **NestJS** — a robust, TypeScript-first framework for building scalable server-side applications. Unlike serverless approaches, this architecture uses containerization (Docker) and ECS Fargate for stateful, long-running processes.

### 1. Create the backend directory

```bash
mkdir spendwise-backend
cd spendwise-backend
```

### 2. Initialize NestJS project

```bash
npm i -g @nestjs/cli
nest new . --package-manager npm
npm install
```

### 3. Install required dependencies

```bash
# Database & ORM
npm install @nestjs/typeorm typeorm pg

# Authentication
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @types/passport-jwt

# Configuration
npm install @nestjs/config dotenv

# AWS SDK (for Secrets Manager & Cognito)
npm install @aws-sdk/client-secrets-manager

# Utilities
npm install class-transformer class-validator bcrypt
npm install @types/bcrypt
```

### 4. Verify installation

```bash
npm run start:dev
```

The server should start on `http://localhost:3000`.

---

## Backend Architecture Layers

The SpendWise backend is organized into four main functional layers:

1. **[Authentication Layer (4.4.1)](4.4.1-Auth/)** — Cognito integration, JWT validation, auth guards
2. **[Data Layer (4.4.2)](4.4.2-Data/)** — PostgreSQL schema, TypeORM entities, database migrations
3. **[Storage Layer (4.4.3)](4.4.3-Storage/)** — Secrets Manager, environment configuration, credential management
4. **[API Functions Layer (4.4.4)](4.4.4-Functions/)** — Controllers, services, business logic endpoints

Each layer is independently testable and can be deployed as a container.

---

[Continue to 4.5 ECS Fargate Deployment](../4.5-ECS-Fargate/)

## Conclusion

With NestJS initialized and dependencies installed, your backend foundation is ready. Next, you'll configure each layer to build a production-grade API that integrates with Cognito for auth, RDS for data, and prepares for containerized deployment on ECS Fargate.
