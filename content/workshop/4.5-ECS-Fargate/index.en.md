

## Overview

The ECS Fargate layer runs a containerized FastAPI service in parallel with the Amplify serverless backend. It handles tasks not suitable for Lambda, such as long-running data processing, custom AI inference, or processes requiring persistent connections.

## What You Will Learn

- Deploy containerized applications with ECS Fargate
- Set up FastAPI services for AI inference
- Configure networking and load balancing
- Integrate containers with serverless architecture
- Optimize for long-running tasks and persistent connections

## Requirements

- Completed Backend Setup section
- Docker Desktop installed
- Understanding of containerization concepts
- Basic knowledge of FastAPI or Python web frameworks

## Content

The ECS Fargate layer runs a containerized FastAPI service in parallel with the Amplify serverless backend. It handles tasks not suitable for Lambda, such as long-running data processing, custom AI inference, or processes requiring persistent connections.

## System Architecture

![NutriTrack API VPC Architecture](images/only-nutritrack-api-vpc.drawio.svg)

The ECS tasks run in a **Private Subnet** for security, while an **Application Load Balancer (ALB)** resides in the **Public Subnet** to receive internet requests. Tasks access other AWS services through a **NAT Instance** (saving 70% cost compared to a NAT Gateway) or an **S3 Gateway Endpoint** (free).

## Estimated Cost

| Component | Estimated Monthly Cost |
| :--- | :--- |
| 2× `t4g.nano` NAT Instance | $7.63 |
| Fargate ARM64 Task | $10.23 |
| Application Load Balancer (ALB) | $28.46 |
| CloudWatch Logs | $0.00 |
| **Total** | **≈$46** |

> [!TIP]
> Using a NAT Instance instead of a NAT Gateway can save you approximately $28 per month (NAT Gateway ≈$35.63/mo vs NAT Instance $7.63/mo), which is significant for startups or experimental projects.

## Implementation Steps:

1. [4.5.1 VPC & Network Infrastructure](4.5.1-VPC-Network/)
2. [4.5.2 Supporting Infrastructure (S3, Secrets, IAM)](4.5.2-Infrastructure/)
3. [4.5.3 NAT Optimization (NAT Instance)](4.5.3-NAT-Instance/)
4. [4.5.4 Fargate & ALB Deployment](4.5.4-Fargate-ALB/)

---

[Continue to 4.6 CI/CD Deployment](../4.6-CICD/)

## Conclusion

By implementing the ECS Fargate layer, you have successfully deployed a containerized FastAPI service that complements the serverless Amplify backend. This hybrid architecture allows NutriTrack to handle both lightweight Lambda functions and resource-intensive containerized tasks, providing a scalable and cost-effective solution for AI-powered nutrition tracking.
