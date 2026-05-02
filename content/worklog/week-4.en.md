### Objectives of Week 4

* Deploy the database on AWS.
* Secure sensitive system information.
* Configure HTTPS and custom domain for the application.

### Tasks Completed During the Week

| Day | Task | Start Date | End Date | References |
|-----|------|------------|----------|------------|
| 1 | - Initialize Amazon RDS (PostgreSQL) <br>&emsp; + Deploy in Private Subnet <br>&emsp; + Configure suitable instance type | 30/03/2026 | 30/03/2026 | - |
| 2 | - Perform database migration <br>&emsp; + Connect ECS Service to RDS <br>&emsp; + Apply database schema | 31/03/2026 | 31/03/2026 | - |
| 3 | - Set up AWS Secrets Manager <br>&emsp; + Store database credentials securely <br>&emsp; + Remove hardcoded secrets from code | 01/04/2026 | 01/04/2026 | - |
| 4 | - Configure VPC Endpoint <br>&emsp; + Gateway Endpoint for S3 <br>&emsp; + Optimize internal access | 02/04/2026 | 02/04/2026 | - |
| 5 | - Configure HTTPS <br>&emsp; + Request SSL certificate via ACM <br>&emsp; + Attach certificate to ALB | 03/04/2026 | 03/04/2026 | - |
| 6 | - Configure custom domain <br>&emsp; + Map domain via Route 53 <br>&emsp; + Connect to ALB and Amplify | 04/04/2026 | 04/04/2026 | - |
| 7 | - Perform security audit <br>&emsp; + Close unnecessary ports <br>&emsp; + Review Security Group rules | 05/04/2026 | 05/04/2026 | - |

### Weekly Achievements

* Database is running reliably within a private network.
* Sensitive information is securely managed using Secrets Manager.
* The system now supports HTTPS with a custom domain.

### Challenges & Lessons Learned

* **Challenge:** Managing connections between ECS and RDS to avoid database overload.
* **Solution:** Monitor connection usage and apply controlled migration strategies.
* **Lesson Learned:** Security should be implemented from the early stages, not as an afterthought.

### Plan for Next Week

* Set up system monitoring using CloudWatch.
* Perform performance testing.
* Configure cost monitoring and alerts.