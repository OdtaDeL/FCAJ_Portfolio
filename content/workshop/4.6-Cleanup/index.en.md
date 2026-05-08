
## Overview

After completing the SpendWise workshop, cleaning up your resources is a critical step to avoid unexpected AWS charges. Some resources, such as NAT Instances, ALBs, and RDS instances, incur hourly costs even when not processing any traffic.

## What You Will Learn

- Proper resource deletion order to avoid dependency conflicts
- Clean up ECS, ALB, RDS, and VPC resources
- Remove Amplify frontend and Secrets Manager credentials
- Delete IAM roles and CloudWatch logs
- Understand cost implications of different AWS services

## Requirements

- Completed all workshop sections
- AWS Console access with administrative permissions
- Understanding of resource dependencies

## Content

﻿After completing the workshop, cleaning up your resources is a critical step to avoid unexpected AWS charges. Some resources, such as NAT Instances and ALBs, incur hourly costs even when not processing any traffic.

> [!IMPORTANT]
> The estimated cost of maintaining the SpendWise resources is approximately **$69-$326/month**. Please follow the steps below as soon as you are finished testing to avoid unnecessary charges.

## Resource Deletion Order

To avoid "Resource in use" errors, you should perform the deletion in order from the application layer out to the network infrastructure layer.

### 1. Application & Compute Layer (ECS & ALB)

1. **ECS Service**: Go to ECS Cluster -> select the service `spendwise-api-service` -> click **Delete**. Wait for all Tasks to stop completely.
2. **ECS Cluster**: Once the Service has been deleted, you can delete the cluster itself.
3. **Application Load Balancer (ALB)**: Go to EC2 -> Load Balancers -> Select the workshop ALB -> **Actions** -> **Delete**.
4. **Target Group**: Delete the corresponding Target Group for the ALB.

### 2. Database Layer (RDS)

> [!IMPORTANT]
> **Delete RDS first** before deleting the VPC, as it must exist in a VPC subnet.

1. **RDS Instance**: Go to RDS Console -> Databases -> Select the `spendwise-db` instance -> click **Delete**.
2. **Snapshots** (Optional): If you created manual snapshots for backup, you can delete them here to save storage costs.
3. **DB Subnet Group**: After the RDS instance is deleted, go to Subnet Groups -> Delete the associated group.

### 3. Networking Layer (VPC & NAT)

1. **NAT Instances**: Go to the EC2 Console -> Instances -> Select your NAT Instances -> **Terminate instance**.
2. **VPC**: Go to the VPC Console -> Your VPCs -> Select `spendwise-api-vpc` -> **Actions** -> **Delete VPC**.
    - *Note: AWS will automatically delete Subnets, Internet Gateways, and Route Tables associated with the VPC.*

### 4. Frontend & Identity Layer (Amplify & Cognito)

1. **AWS Amplify**: Go to the Amplify Console -> Select the SpendWise app -> **Actions** -> **Delete app**. This will remove the frontend hosting and continuous deployment pipeline.
2. **Amazon Cognito**: Go to Cognito Console -> User Pools -> Select `spendwise-user-pool` -> **Delete**. Confirm the deletion (note: this is irreversible).
3. **Secrets Manager**: Go to Secrets Manager -> Select the secret containing your database credentials and API keys -> **Delete secret**. (Note: AWS defaults to a 7-30 day waiting period before permanent deletion).

### 5. IAM & Monitoring (CloudWatch)

1. **IAM Roles**: Delete manually created roles such as `ecsTaskRole` and `ecsTaskExecutionRole` if they are no longer needed for other projects.
2. **CloudWatch Logs**: Delete the Log Groups (`/ecs/spendwise-api`) to keep your management interface clean.
3. **CloudWatch Alarms**: Go to CloudWatch -> Alarms -> Delete any budget or monitoring alarms you created.

---

## Conclusion

Congratulations on successfully completing the SpendWise deployment workshop on AWS! By following the cleanup procedures, you have safely removed all resources and avoided unnecessary charges. The knowledge gained about 3-tier architecture, infrastructure as code (Terraform), containerization (ECS Fargate), and database management (RDS) will be invaluable for your future cloud projects.

The SpendWise platform demonstrates how to build a production-grade financial application with security, scalability, and cost-efficiency in mind.

[Back to Homepage](../../)
