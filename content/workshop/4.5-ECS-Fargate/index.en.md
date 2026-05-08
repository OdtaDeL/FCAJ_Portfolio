
---
title: ECS Fargate Layer
slug: /workshop/4.5-ecs-fargate/
description: Workshop content: deploying the SpendWise container layer with ECS Fargate.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

This section covers the ECS Fargate layer for SpendWise. The containerized backend runs alongside the Amplify backend and is used for parts of the system that fit better in a container, such as the NestJS API, longer-running work, or anything that needs a persistent runtime.

## What You Will Learn

- Deploy a containerized backend with ECS Fargate.
- Set up the VPC and networking around the service.
- Place the API behind an Application Load Balancer.
- Use NAT Instance and endpoints to keep costs under control.
- Connect the container layer with the rest of SpendWise.

## Requirements

- Completed 4.4 Backend Setup.
- Docker Desktop installed.
- Basic understanding of containers and AWS networking.
- Familiarity with NestJS or server-side APIs.

## Content

The ECS Fargate layer runs the container part of SpendWise. It is a good fit for the NestJS API and any task that should stay alive longer than a Lambda function usually would.

## System Architecture

![SpendWise API VPC Architecture](images/only-nutritrack-api-vpc.drawio.svg)

The ECS tasks run in a **Private Subnet** for security, while an **Application Load Balancer (ALB)** sits in the **Public Subnet** and receives traffic from the internet. Tasks reach AWS services through a **NAT Instance** or through service endpoints where possible.

## Estimated Cost

| Component | Estimated Monthly Cost |
| :--- | :--- |
| 2× `t4g.nano` NAT Instance | $7.63 |
| Fargate ARM64 Task | $10.23 |
| Application Load Balancer (ALB) | $28.46 |
| CloudWatch Logs | $0.00 |
| **Total** | **≈$46** |

> [!TIP]
> A NAT Instance is cheaper than a NAT Gateway and is enough for this workshop setup.

## Implementation Steps

1. [4.5.1 VPC & Network Infrastructure](4.5.1-VPC-Network/)
2. [4.5.2 Supporting Infrastructure](4.5.2-Infrastructure/)
3. [4.5.3 NAT Optimization](4.5.3-NAT-Instance/)
4. [4.5.4 Fargate & ALB Deployment](4.5.4-Fargate-ALB/)

---

[Continue to 4.6 CI/CD Deployment](../4.6-CICD/)

## Conclusion

By the end of this section, the SpendWise container layer will be ready to sit behind the load balancer and work with the rest of the stack.
