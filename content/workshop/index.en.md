---
title: "SpendWise — AWS Full-Stack Deployment Workshop"
slug: "/workshop"
description: "This guide provides a complete step-by-step process for deploying NutriTrack—an automated AI nutrition tracking and image analysis system on AWS."
thumbnail: "/images/workshop/default-thumbnail.png"
date: "2026-05-03"
tags: ["AWS", "SpendWise", "Full-Stack", "Deployment", "Workshop"]
category: "Workshop"
author: "FCAJ Team"
status: "published"
---

## Overview

This guide provides a complete step-by-step process for deploying **NutriTrack**—an automated AI nutrition tracking and image analysis system on AWS. The workshop leverages the **AWS Amplify Gen 2** governance framework to establish a core serverless infrastructure including **Amazon Cognito** (Authentication), **AWS AppSync** & **DynamoDB** (Data), and **Amazon S3** (Storage). The system is extended with a high-performance computing layer using **Amazon ECS Fargate** to handle computer vision tasks and in-depth nutrition analysis via **Amazon Bedrock**, seamlessly connecting to the **React Native** mobile application. The entire solution incorporates an automated **CI/CD** process, optimizing deployment from development to actual operation in the cloud environment.

## What You Will Learn

- Design and deploy a full-stack AWS application using modern cloud services
- Implement serverless architecture with AWS Amplify Gen 2
- Set up authentication with Amazon Cognito
- Build GraphQL APIs with AWS AppSync and DynamoDB
- Deploy containerized applications with ECS Fargate
- Integrate AI services using Amazon Bedrock
- Establish CI/CD pipelines for automated deployment
- Optimize costs and manage cloud resources effectively

## Requirements

- AWS Account with administrator access
- Basic knowledge of AWS services and cloud computing
- Experience with React Native development
- Understanding of containerization and Docker
- Familiarity with CI/CD concepts

## Content

## Workshop Contents

1. [Overview](4.1-Overview/)
2. [Prerequisites](4.2-Prerequiste/)
3. [Frontend Setup](4.3-Frontend/)
4. [Backend Setup](4.4-Backend/)
5. [ECS Fargate Tier](4.5-ECS-Fargate/)
6. [CI/CD](4.6-CICD/)
7. [Resource Cleanup](4.7-Cleanup/)

## Cost Estimation

The following table provides an estimated cost for maintaining the NutriTrack system on AWS. Please note that actual costs may vary based on usage levels and specific configurations.

| Services             | Monthly Cost | Cost per Day |
|----------------------|-------------:|-------------:|
| Amazon Route 53      | $0.90        | $0.016       |
| Amplify WAF          | $42.10       | $1.403       |
| CloudFront           | $0.00        | $0.850       |
| AWS Amplify          | $4.65        | $0.341       |
| Fargate ARM64        | $10.23       | $0.254       |
| ALB                  | $28.46       | $0.040       |
| NAT Instance         | $7.63        | $0.2544      |
| Amazon Cognito       | $0.00        | $0.016       |
| AWS AppSync          | $3.11        | $0           |
| AWS Lambda           | $0.00        | $0.008       |
| Amazon Transcribe    | $6.57        | $0.010       |
| Amazon Bedrock       | $147.57      | $0.001       |
| Amazon S3            | $1.47        | $0           |
| Amazon DynamoDB      | $0.13        | $0.007       |
| CloudWatch           | $0.00        | $0           |
| AWS Secrets Manager  | $1.20        | $0           |
| **Total**            | **$254.02**  | **$2.94**    |

## Conclusion

By completing this workshop, you will have gained hands-on experience in building and deploying a complete full-stack application on AWS. You'll understand how to integrate various AWS services to create a scalable, secure, and cost-effective cloud solution that leverages modern technologies like serverless computing, containerization, and AI services.
