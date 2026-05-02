### Objectives of Week 2

* Initialize infrastructure using Terraform.
* Set up core networking components on AWS.
* Prepare the foundation for application deployment.

### Tasks Completed During the Week

| Day | Task | Start Date | End Date | References |
|-----|------|------------|----------|------------|
| 1 | - Initialize Terraform <br>&emsp; + Configure S3 bucket as remote backend <br>&emsp; + Set up DynamoDB for state locking | 16/03/2026 | 16/03/2026 | - |
| 2 | - Set up Amazon VPC <br>&emsp; + Create Public and Private Subnets across multiple Availability Zones <br>&emsp; + Configure Internet Gateway for public access | 17/03/2026 | 17/03/2026 | - |
| 3 | - Configure security <br>&emsp; + Create Security Groups for ALB, ECS, and RDS <br>&emsp; + Apply least privilege principle | 18/03/2026 | 18/03/2026 | - |
| 4 | - Initialize container services <br>&emsp; + Create repository on Amazon ECR <br>&emsp; + Configure basic ECS Cluster | 19/03/2026 | 19/03/2026 | - |
| 5 | - Set up load balancing <br>&emsp; + Configure Application Load Balancer (ALB) <br>&emsp; + Create Target Group for backend service | 20/03/2026 | 20/03/2026 | - |
| 6 | - Configure VPC Endpoints <br>&emsp; + Interface Endpoints for ECR and CloudWatch <br>&emsp; + Ensure internal traffic does not go through the Internet | 21/03/2026 | 21/03/2026 | - |
| 7 | - Infrastructure validation <br>&emsp; + Verify connectivity between subnets <br>&emsp; + Test internal access via VPC Endpoints | 22/03/2026 | 22/03/2026 | - |

### Weekly Achievements

* Core networking infrastructure (VPC) was successfully established with clear Public/Private segmentation.
* Terraform was fully utilized to manage infrastructure as code.
* Foundational services such as ECR, ECS, and ALB were ready for deployment.

### Challenges & Lessons Learned

* **Challenge:** Designing VPC and configuring routing rules was initially complex.
* **Solution:** Follow AWS best practices and validate each component step-by-step.
* **Lesson Learned:** A well-designed infrastructure foundation significantly reduces future scalability and maintenance issues.

### Plan for Next Week

* Deploy backend application to ECS Fargate.
* Integrate user authentication using Amazon Cognito.
* Connect frontend with backend APIs.