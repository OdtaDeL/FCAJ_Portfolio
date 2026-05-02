# SpendWise Platform

## Project Proposal for SpendWiseApp Deployment on AWS

---

### 1. Project Overview

SpendWise is a comprehensive personal finance management web application designed to solve a real-world problem: helping users track, analyze, and control their personal finances effectively and intuitively. The application is deployed entirely on AWS Cloud to ensure high flexibility and data security.

---

### 2. Context and Solution

#### Current Issues
For a financial management app, user data and system stability are critical factors. Deploying on single servers or fragmented self-managed infrastructure often leads to:
* **Risk of financial data loss** due to manual backups and inconsistent recovery processes.
* **Traffic spikes** at the beginning/end of the month causing slow response times, congestion, and downtime.
* **Difficulties in upgrading** or bug fixing as direct server manipulation often leads to configuration errors.
* **Lack of centralized monitoring**, leading to prolonged incident detection and resolution times.
* **Insecure data environments** due to non-standardized access control and infrastructure management.

#### How SpendWise Solves This?
SpendWise utilizes a Cloud-native approach via AWS Cloud:
* **Modern Frontend:** NextJS framework hosted and deployed via AWS Amplify.
* **Robust Backend:** NestJS framework deployed using AWS ECS Fargate.
* **Secure Networking:** Deployment within a VPC, separating public/private access layers and utilizing an Application Load Balancer.

---

### 3. Solution Architecture

The proposed architecture strictly follows a 3-tier application model on the cloud environment:

#### AWS Services
| Service | Role in SpendWise |
|:---|:---|
| **Amazon VPC** | Private network; partitioned into public/private subnets across multiple AZs. |
| **ALB** | Application Load Balancer for entry-point traffic and load balancing to ECS. |
| **Amazon ECS** | Runs NestJS backend containers using the Fargate serverless engine. |
| **Amazon RDS** | Relational Database for financial data (PostgreSQL), located in private subnets. |
| **AWS Amplify** | Automates builds and hosts the Next.js frontend from Git. |
| **Amazon Cognito** | Manages user pools, registration, login, and authentication. |
| **AWS WAF** | Protects the web layer against common attacks like SQLi/XSS and bots. |

#### Specific Technical Design
* **VPC Endpoints:** Provides private connections to ECR, CloudWatch, and Cognito to avoid NAT costs for internal traffic.
* **Bastion Host:** Uses Amazon EC2 as a jump box to securely operate the database within the VPC.
* **Secrets Manager:** Securely stores and manages database credentials and API secret keys.

---

### 4. Technical Implementation

#### Technologies Used
* **Frontend:** NextJS, AWS Amplify.
* **Backend:** NestJS, AWS ECS Fargate, ECR.
* **Infrastructure:** Terraform (recommended) to manage VPC, Security Groups, and ALB configurations.

#### Development Path
The project focuses on building the core network and identity foundation first, followed by application deployment and data stabilization.

---

### 5. Timeline & Milestones

* **Week 1 - Foundation:** Finalize requirements, initialize Terraform, and set up basic VPC, SG, ALB, ECR, and ECS.
* **Week 2 - Identity & App Deployment:** Integrate Cognito, push images to ECR, rollout ECS, and connect Amplify.
* **Week 3 - Data & Hardening:** Enable RDS and perform data migration, verify private networking, and set up HTTPS.
* **Week 4 - Stabilization & Handover:** Performance testing, setting up monitoring/alerts, and cost evaluation/optimization.

---

### 6. Risk Assessment & Mitigation

| Risk | Mitigation Strategy |
|:---|:---|
| **Rapid NAT/ALB cost increase** | Set budget alarms, perform weekly cost reviews, and right-size resources. |
| **Env/Secret configuration drift** | Standardize environment variables and implement mandatory release checklists. |
| **DB operational risks** | Controlled migrations, periodic restore testing, and connection monitoring. |
| **Infrastructure security risks** | Apply the principle of least privilege and conduct regular SG/IAM reviews. |

---

### 7. Budget (Estimated Monthly)

* **Total AWS Cost:** $69 - $326.
* **Core Components:**
    * **ALB:** $18 - $35.
    * **ECS Fargate:** $9 - $25.
    * **RDS PostgreSQL:** $12 - $35.
    * **VPC Endpoints:** $20 - $70.

---

### 8. Next Steps

* **Cost Control:** Temporarily disable the Bastion host and Custom domain during initial phases to reduce fixed costs.
* **DB Optimization:** Maintain a single RDS instance (Single-AZ, small configuration).
* **Monitoring:** Set appropriate CloudWatch log retention periods to avoid unnecessary storage fees.

---

### 9. Expected Results

* **Efficiency:** Entry time for financial records reduced from 3 minutes to 10 seconds through AI-assisted tools.
* **Accuracy:** Achieve 95% accuracy for localized data processing using advanced Vision AI models.
* **Scalability:** Ready to handle 10,000+ users with near-zero maintenance costs during idle periods.

---

### 10. Recovery Strategy

* **Automated Deployment:** Use standardized image/deployment pipelines to minimize configuration errors.
* **Data Recovery:** Leverage RDS automated backup mechanisms to ensure data consistency and restore capabilities.
* **Incident Monitoring:** Utilize CloudWatch for rapid detection and resolution of errors to minimize system downtime.