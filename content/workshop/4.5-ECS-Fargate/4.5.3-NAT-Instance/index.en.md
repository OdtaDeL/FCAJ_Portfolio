

## Overview

In this section, you'll implement a cost-optimized alternative to AWS NAT Gateway by deploying a NAT Instance on EC2. This approach allows private ECS tasks to access external resources (such as package repositories and external APIs) while maintaining security isolation. By using a lightweight t4g.nano instance with ARM Graviton architecture, you'll reduce NAT costs from ~$32/month to approximately $4.33/month. You'll configure IP forwarding and iptables masquerading to enable packet translation, and optionally set up an Auto Scaling Group for high availability.

## What You Will Learn

- Understanding NAT Gateway vs. NAT Instance trade-offs (cost, throughput, management)
- Launching and configuring an EC2 instance as a NAT appliance
- Disabling source/destination checking to enable packet forwarding
- Enabling IP forwarding and configuring iptables for NAT masquerading
- Setting up private subnet route tables to direct outbound traffic through the NAT Instance
- Implementing high availability with Auto Scaling Groups
- Monitoring NAT Instance performance and cost

## Requirements

- Completion of [4.5.1 VPC & Networking](../4.5.1-VPC-Network/) and [4.5.2 Infrastructure](../4.5.2-Infrastructure/)
- AWS account with EC2 permissions (launch instances, modify security groups, attach IAM roles)
- Access to SSH or AWS Systems Manager Session Manager for instance configuration
- IAM role created for NAT Instance: `spendwise-api-vpc-nat-instance-role`
- Approximately 25–35 minutes to complete this section

## Content

﻿In an AWS environment, resources in a Private Subnet (like ECS Tasks) typically need a NAT Gateway to access the internet. However, NAT Gateway has a high fixed cost (~$32/mo). In this workshop, we use a **NAT Instance** to save up to 70% in costs.

> **Prerequisite:** Completed [VPC & Network](../4.5.1-VPC-Network/) and [Infrastructure](../4.5.2-Infrastructure/).

## Why NAT Instance?

| Metric | NAT Gateway | NAT Instance (t4g.nano) |
| :--- | :--- | :--- |
| **Cost** | ≈$32–34/mo | **≈$4.33/mo** |
| **Throughput** | 100 Gbps | 5 Gbps (Enough for workshop) |
| **Management** | Managed by AWS | Managed by you (Self-setup) |

---

## 1. Initialize NAT Instance

We use a `t4g.nano` instance (ARM Graviton) for optimal cost and performance.

1. Go to **EC2 Console** → **Launch Instances**.
2. **AMI**: Select **Amazon Linux 2023** (64-bit Arm).
3. **Instance Type**: `t4g.nano`.
4. **Network Settings**:
   - VPC: `spendwise-api-vpc`
   - Subnet: `spendwise-api-vpc-public-alb01` (Public Subnet)
   - Auto-assign Public IP: **Enable**
   - Security Group: `spendwise-api-vpc-nat-sg`
5. **IAM instance profile**: Select `spendwise-api-vpc-nat-instance-role`.
6. Click **Launch instance**.

> [!IMPORTANT]
> Once the instance is running, you **must** disable **Source/Destination Check**:
> Select Instance → **Actions** → **Networking** → **Change source/destination check** → Select **Stop**.

---

## 2. NAT Configuration (Auto-script)

Once you've connected to the NAT Instance via SSH or SSM, run the following script to enable packet forwarding and Masquerading:

```bash
#!/bin/bash
# 1. Enable IP Forwarding
sudo sysctl -w net.ipv4.ip_forward=1

# 2. Install iptables-services
sudo dnf install iptables-services -y
sudo systemctl enable iptables
sudo systemctl start iptables

# 3. Configure NAT Masquerade
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables-save | sudo tee /etc/sysconfig/iptables
```

---

## 3. High Availability (ASG)

To ensure system continuity if a NAT Instance fails, you should use an **Auto Scaling Group (ASG)**.

The ASG will automatically detect instance failure and launch a replacement. You can use **User Data** in the Launch Template to automate the configuration and update the Route Table to point to the new Instance ID.

---

## Next Steps:
- [4.5.4 Fargate & ALB Deployment](../4.5.4-Fargate-ALB/)

## Conclusion

You have successfully deployed and configured a cost-optimized NAT Instance for the SpendWise infrastructure. Your NAT Instance now handles outbound internet traffic from private ECS tasks while reducing monthly NAT costs by approximately 87% compared to AWS NAT Gateway. The instance is configured with IP forwarding and iptables masquerading, and optionally protected by an Auto Scaling Group for high availability. Your ECS tasks can now safely access external resources while maintaining network isolation. You are now ready to deploy the NestJS API on ECS Fargate with the Application Load Balancer.
