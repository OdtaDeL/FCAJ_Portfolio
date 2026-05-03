## Overview

SpendWise is a modern personal finance management web application that helps users track and analyze their spending intuitively. The system is deployed on AWS Cloud using a **3-tier** architecture, ensuring high security through a Virtual Private Cloud (VPC), centralized user authentication (Cognito), and Infrastructure as Code (IaC) management.

## What You Will Learn

* How to set up a secure network infrastructure with **Amazon VPC**, partitioning Public/Private Subnets, and configuring **VPC Endpoints**.
* Deploying containerized applications using **Amazon ECS Fargate** combined with an **Application Load Balancer (ALB)**.
* Managing identity and user authentication with **Amazon Cognito**.
* Operating and connecting an **Amazon RDS** relational database within a secure private network.
* Automating Frontend deployment using **AWS Amplify** and securing the application with **AWS WAF** & **Secrets Manager**.

## Requirements

* An AWS Account (Free Tier or available credit).
* Basic knowledge of **NextJS** (Frontend) and **NestJS** (Backend).
* Git and Terraform installed (for infrastructure deployment as code).

## Content

# SpendWise — Full-Stack Deployment Workshop on AWS

## Overview
This guide provides a complete step-by-step process for deploying **SpendWise** — a personal finance management and analysis system on AWS. The workshop focuses on building a solid infrastructure using **Terraform**, utilizing **Amazon Cognito** for identity management, and **Amazon ECS Fargate** to run a serverless backend. Financial data is securely stored in **Amazon RDS** located in a private subnet, connecting to a **NextJS** frontend through **AWS Amplify**. The entire solution is designed for flexible scaling, absolute security via the **AWS WAF** firewall layer, and centralized key management using **Secrets Manager**.

## Workshop Content

1. [Overview & Architecture](4.1-Overview/)
2. [VPC Setup & Terraform Foundation](4.2-Infrastructure/)
3. [Identity Deployment with Amazon Cognito](4.3-Cognito/)
4. [Backend Containerization & ECS Fargate](4.4-Backend-ECS/)
5. [Amazon RDS Configuration & Database](4.5-Database/)
6. [Amplify Frontend Deployment & HTTPS](4.6-Frontend/)
7. [CloudWatch Monitoring & Cleanup](4.7-Cleanup/)

## Cost Estimation

Below is an estimated monthly cost for maintaining the SpendWise system on AWS based on the recommended configuration.

| Service                               | Estimated Monthly Cost | Daily Cost  |
|---------------------------------------|-----------------------:|------------:|
| Application Load Balancer (ALB)       | $26.00                 | $0.866      |
| Amazon ECS Fargate                    | $17.00                 | $0.566      |
| Amazon RDS PostgreSQL                 | $23.50                 | $0.783      |
| Amazon VPC Endpoints                  | $45.00                 | $1.500      |
| AWS WAF                               | $6.00                  | $0.200      |
| AWS Amplify                           | $4.50                  | $0.150      |
| AWS Secrets Manager                   | $1.20                  | $0.040      |
| Amazon Route 53                       | $0.90                  | $0.030      |
| **Total**                             | **$124.10**            | **$4.135**  |

---

## Conclusion

By completing this workshop, you will own an enterprise-grade **SpendWise** financial management system on AWS. This solution not only addresses performance and scalability but also lays a solid foundation for financial data security for end-users.