

## Overview

In this section, you'll set up the supporting infrastructure services that enable secure and reliable deployment of the SpendWise API on ECS Fargate. This includes creating an Amazon ECR (Elastic Container Registry) repository to store your NestJS Docker images, configuring AWS Secrets Manager to securely manage database credentials and JWT secrets, and establishing IAM roles and policies that allow ECS tasks to access these resources with minimal privilege. Together, these services form the security and deployment backbone of your containerized application.

## What You Will Learn

- Creating a private Amazon ECR repository and understanding image push/pull workflows
- Configuring AWS Secrets Manager to store sensitive credentials securely
- Setting up IAM roles and trust relationships for ECS service integration
- Understanding the distinction between `ecsTaskExecutionRole` (for AWS services) and `ecsTaskRole` (for application logic)
- Implementing least-privilege access policies
- Injecting secrets into containers as environment variables

## Requirements

- Completion of [4.5.1 VPC & Networking](../4.5.1-VPC-Network/)
- AWS account with IAM permissions to create ECR repositories, Secrets Manager secrets, and IAM roles
- Knowledge of RDS endpoint, database credentials, and JWT secret values (from backend configuration)
- Approximately 30–40 minutes to complete this section

## Content

﻿This section guides you through setting up the supporting infrastructure for the SpendWise ECS Fargate cluster: **ECR** for container images, **Secrets Manager** for secure credentials, and **IAM Roles** for execution permissions.

> **Prerequisite:** Completed [4.5.1 Network Infrastructure (VPC & Network)](../4.5.1-VPC-Network/).

---

## 1. Amazon ECR (Container Registry)

We need an Amazon ECR repository to store the Docker image used by the SpendWise API container.

### 1.1 Create ECR Repository
1. Go to AWS Console → **ECR** → **Repositories** → **Create repository**.
2. **Repository name**: `spendwise-api`.
3. **Visibility**: Private.
4. Click **Create repository**.

---

## 2. Secrets Manager

Secrets Manager stores database credentials, JWT secrets, and Cognito settings securely and injects them into the container as environment variables.

### 2.1 Create Secret
1. Go to **Secrets Manager** → **Store a new secret**.
2. Select **Secret type**: `Other type of secret`.
3. Add the following **Key/value** pairs:
   - `DB_HOST`: <RDS endpoint>
   - `DB_USER`: <Database user>
   - `DB_PASSWORD`: <Database password>
   - `JWT_SECRET`: <Shared JWT secret>
4. Name the Secret: `spendwise/prod/backend-credentials`.
5. After saving, copy the **ARN** of this Secret.

---

## 3. IAM Roles for ECS

ECS uses two distinct roles for different purposes:

| Role Name | Who uses it | Purpose |
| :--- | :--- | :--- |
| **`ecsTaskExecutionRole`** | AWS ECS Agent | Pull Docker image, send logs to CloudWatch, read Secrets Manager. |
| **`ecsTaskRole`** | App inside container | Read RDS credentials, access Secrets Manager, write logs if needed. |

### 3.1 Configure `ecsTaskExecutionRole`
1. Find or create a role named `ecsTaskExecutionRole`.
2. Ensure it has the managed policy: `AmazonECSTaskExecutionRolePolicy`.
3. Add an **Inline Policy** (JSON) to allow reading the Secret ARN copied above.

### 3.2 Create `ecsTaskRole`
1. Create a new role with Trusted Entity: `Elastic Container Service Task`.
2. Attach an **Inline Policy** allowing Secrets Manager access and any additional AWS API access required by the API.

---

## Next Steps:
- [4.5.3 NAT Optimization (NAT Instance)](../4.5.3-NAT-Instance/)
- [4.5.4 Fargate & ALB Deployment](../4.5.4-Fargate-ALB/)

## Conclusion

You have successfully provisioned the supporting infrastructure for the SpendWise API deployment. Your ECR repository is ready to receive NestJS Docker images, Secrets Manager securely stores your database credentials and JWT secrets with controlled access, and your IAM roles are configured with least-privilege policies. This infrastructure layer provides the secure foundation for deploying containerized applications. You are now ready to configure the NAT Instance for cost-effective internet access from private subnets.
