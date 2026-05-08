

## Overview

_TBD._

## What You Will Learn

_TBD._

## Requirements

_TBD._

## Content

﻿This is the final step to complete the SpendWise API deployment: build the Docker image for the NestJS service, push it to a registry, and set up the ECS Fargate cluster and Application Load Balancer (ALB).

## 1. Build & Push Docker Image

We need a Docker image containing the SpendWise NestJS source code, optimized for the AWS Graviton (ARM64) architecture.

### Build and Push to Docker Hub
```bash
# Log in to Docker Hub
docker login

# Build multi-platform (ARM64) and push
docker buildx build \
  --platform linux/arm64 \
  --tag <username>/spendwise-api:latest \
  --push .
```

---

## 2. Initialize ECS Cluster

1. Go to **ECS Console** → **Clusters** → **Create cluster**.
2. **Cluster name**: `spendwise-api-cluster`.
3. **Infrastructure**: Select `AWS Fargate (serverless)`.
4. Click **Create**.

---

## 3. Task Definition

The Task Definition specifies which image to run, CPU/RAM resources, and required environment variables.

1. Go to **Task Definitions** → **Create new task definition**.
2. **OS/Architecture**: `Linux/ARM64` (To save costs with Graviton).
3. **CPU**: `1 vCPU`, **Memory**: `2 GB`.
4. **Task Execution Role**: `ecsTaskExecutionRole`.
5. **Container Details**:
  - **Name**: `spendwise-api-container`
  - **Image**: `<username>/spendwise-api:latest`
  - **Port mapping**: `3000` (TCP).

---

## 4. Application Load Balancer (ALB)

ALB receives user traffic and distributes it to the ECS containers.

1. **Target Group**: Create `spendwise-api-tg`, port 3000, type **IP**. Health check path: `/health`.
2. **Load Balancer**: Create an **Internet-facing** ALB, select the Public Subnets created in 4.5.1.
3. **Security Group**: Attach `spendwise-api-vpc-alb-sg`.
4. **Listener**: Route port 80 traffic to the Target Group.

---

## 5. Security with AWS WAF

Add a security layer (WAF) to reduce brute-force and bot traffic. For SpendWise, the API should only accept authenticated requests from the frontend and trusted clients.

- **Rate Limit**: Max 100 requests per IP per 5 minutes.
- **JWT-based access**: Protect the API with Cognito-issued tokens.

---

## 6. ECS Service

Finally, create a Service to maintain the running tasks.

1. Go to Cluster → **Services** tab → **Create**.
2. **Capacity Provider**: `FARGATE_SPOT` (For maximum cost optimization).
3. **Deployment Configuration**: Select your Task Definition.
4. **Networking**: Select 2 Private Subnets and the ECS Security Group.
5. **Load Balancing**: Select the ALB and Target Group.
6. Click **Create**.

---

## Summary of Achievement:

Your SpendWise backend is now complete:
- A NestJS API running on ECS Fargate.
- Private networking to RDS PostgreSQL.
- Public traffic controlled by ALB and WAF.

---

[Continue to 4.6 Cleanup](../../4.6-Cleanup/)

## Conclusion

_TBD._
