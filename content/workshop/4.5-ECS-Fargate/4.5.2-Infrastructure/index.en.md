

## Overview

_TBD._

## What You Will Learn

_TBD._

## Requirements

_TBD._

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

_TBD._
