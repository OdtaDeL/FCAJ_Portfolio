

## Overview

In this final section, you'll complete the SpendWise API deployment by building the NestJS Docker image, pushing it to ECR, and configuring the ECS Fargate cluster with an Application Load Balancer. The ALB serves as the single entry point for all external traffic, routing requests to containerized NestJS instances running in private subnets. You'll also implement AWS WAF (Web Application Firewall) to protect against common attacks and rate-limit malicious traffic. This is the culmination of all previous sections, bringing together networking, infrastructure, security, and orchestration into a fully functional, production-ready API deployment.

## What You Will Learn

- Building multi-platform (ARM64) Docker images optimized for AWS Graviton
- Pushing Docker images to Amazon ECR
- Creating ECS task definitions with CPU, memory, and environment variable configurations
- Setting up ECS Fargate clusters and services
- Configuring Application Load Balancers (ALB) with target groups and health checks
- Integrating AWS WAF with ALB for rate limiting and threat protection
- Implementing auto-scaling for ECS services
- Understanding cost optimization with FARGATE_SPOT capacity providers

## Requirements

- Completion of [4.5.1 VPC & Networking](../4.5.1-VPC-Network/), [4.5.2 Infrastructure](../4.5.2-Infrastructure/), and [4.5.3 NAT Instance](../4.5.3-NAT-Instance/)
- SpendWise NestJS backend source code available locally with Dockerfile
- Docker installed and configured on your machine
- Docker Hub account or private container registry (for pushing images)
- AWS account with ECS, ALB, and WAF permissions
- Task Execution Role (`ecsTaskExecutionRole`) and Task Role (`ecsTaskRole`) created and configured
- Approximately 45–60 minutes to complete this section

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

Congratulations! You have successfully completed the SpendWise API deployment on AWS. Your NestJS backend is now running on ECS Fargate across multiple Availability Zones, protected by an Application Load Balancer and AWS WAF. All traffic flows securely through the ALB, which distributes requests to private ECS tasks. Your infrastructure is scalable, highly available, and cost-optimized with NAT Instance egress and Fargate Spot capacity. The SpendWise API is production-ready and can now serve authenticated requests from the frontend application with full database access via RDS PostgreSQL. Proceed to the [Cleanup](../../4.6-Cleanup/) section to learn how to safely remove resources when your deployment is complete.
