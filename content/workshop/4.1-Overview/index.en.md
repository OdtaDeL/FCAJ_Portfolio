## Overview

This workshop is designed to guide you through the process of building and deploying **SpendWise** — a modern personal finance management platform that leverages the power of **Terraform**, **Amazon ECS Fargate**, and **Amazon RDS**[cite: 1, 2]. Based on a real-world production codebase, this workshop will help you master secure 3-tier cloud architecture and explore how to optimally manage financial data with high-performance infrastructure[cite: 1].

## What You Will Learn

- Design and deploy a secure 3-tier AWS application using modern cloud services[cite: 1].
- Implement Infrastructure as Code (IaC) with **Terraform** for consistent deployments[cite: 1].
- Set up centralized authentication with **Amazon Cognito**[cite: 2].
- Build and containerize a **NestJS** backend for deployment on **ECS Fargate**[cite: 2].
- Securely manage relational data using **Amazon RDS (PostgreSQL)** in private subnets[cite: 3].
- Protect web applications from common vulnerabilities using **AWS WAF**[cite: 5].
- Establish operational monitoring with **CloudWatch** and manage cloud costs effectively[cite: 4, 7].

## Requirements

- AWS Account with administrator access.
- Basic knowledge of AWS services and cloud computing.
- Experience with **NextJS** (Frontend) and **NestJS** (Backend) development[cite: 1, 2].
- Understanding of containerization and Docker.
- Familiarity with **Terraform** and Infrastructure as Code concepts[cite: 1].

## Content

## Introduction
This workshop guides you through the process of building and deploying **SpendWise** — a modern financial tracking platform that combines **AWS Amplify**, **Amazon ECS Fargate**, and **Amazon RDS**[cite: 1, 2, 3]. By following this guide, you will master the implementation of secure network layers and automated infrastructure management essential for financial applications[cite: 1, 3].

## Overall Architecture



## Infrastructure Summary

Here are the key components you will deploy throughout the Workshop:

### 1. Database (Amazon RDS PostgreSQL)
The database is hosted in a Private Subnet to ensure financial data is never exposed directly to the internet[cite: 3].

| Table Name | Primary Function | Notes |
| :--- | :--- | :--- |
| **`Users`** | Identity Management | Stores user profiles synchronized via Cognito[cite: 5]. |
| **`Transactions`** | Financial Records | Tracks income and expenses with categories[cite: 1]. |
| **`Budgets`** | Financial Planning | Stores user-defined limits and tracking goals[cite: 1]. |
| **`Categories`** | Classification | System and user-defined expense categories[cite: 1]. |

### 2. Logic & Compute Layer
1. **`ECS Fargate (NestJS)`**: The core backend engine handling business logic and API requests[cite: 2].
2. **`AWS Lambda`**: Handles post-confirmation triggers to sync Cognito users with the RDS database[cite: 5].
3. **`Application Load Balancer (ALB)`**: Distributes traffic to the ECS backend and handles SSL termination[cite: 1, 3].
4. **`Bastion Host`**: Provides a secure "jump box" for administrators to manage the private RDS instance[cite: 5].

### 3. Key Features & Security
* **Infrastructure as Code**: 100% of the environment is managed via **Terraform** for reliability[cite: 1].
* **Secrets Management**: Sensitive credentials are encrypted and stored in **AWS Secrets Manager**[cite: 3].
* **Network Security**: A strict VPC design with Public/Private subnets and **AWS WAF** protection[cite: 1, 5].
* **Cost Governance**: Automated **Budget Alarms** to prevent unexpected AWS billing spikes[cite: 4].

---

[Continue to 4.2 Prerequisites](../4.2-Prerequiste/)

## Conclusion

By understanding the overall architecture and components of SpendWise, you're now prepared to dive into the practical implementation. This overview provides the foundation for understanding how each AWS service integrates to create a comprehensive, scalable, and secure financial platform[cite: 1, 8].