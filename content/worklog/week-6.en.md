### Objectives of Week 6

* Strengthen application security.
* Establish secure access to internal resources.
* Automate backend workflows.

### Tasks Completed During the Week

| Day | Task | Start Date | End Date | References |
|-----|------|------------|----------|------------|
| 1 | - Deploy AWS WAF <br>&emsp; + Create Web ACL and attach to ALB <br>&emsp; + Configure basic rules | 13/04/2026 | 13/04/2026 | - |
| 2 | - Configure WAF rules <br>&emsp; + Block SQL Injection (SQLi) <br>&emsp; + Block Cross-site Scripting (XSS) <br>&emsp; + Apply rate limiting | 14/04/2026 | 14/04/2026 | - |
| 3 | - Set up Bastion Host <br>&emsp; + Launch small EC2 instance <br>&emsp; + Configure port forwarding to RDS | 15/04/2026 | 15/04/2026 | - |
| 4 | - Configure AWS Lambda <br>&emsp; + Trigger PostConfirmation from Cognito <br>&emsp; + Sync user data to RDS | 16/04/2026 | 16/04/2026 | - |
| 5 | - Perform security audit <br>&emsp; + Restrict Bastion access by IP <br>&emsp; + Review Security Group rules | 17/04/2026 | 17/04/2026 | - |
| 6 | - System testing <br>&emsp; + Test user registration flow <br>&emsp; + Verify data consistency | 18/04/2026 | 18/04/2026 | - |
| 7 | - Analyze security logs <br>&emsp; + Review WAF logs <br>&emsp; + Evaluate effectiveness of security rules | 19/04/2026 | 19/04/2026 | - |

### Weekly Achievements

* The system is protected against common web vulnerabilities.
* Secure administrative access is established without exposing the database publicly.
* User data synchronization is fully automated.

### Challenges & Lessons Learned

* **Challenge:** Initial WAF rules caused false positives.
* **Solution:** Fine-tune rules based on real traffic and testing scenarios.
* **Lesson Learned:** Security configurations must be continuously tested to avoid impacting real users.

### Plan for Next Week

* Optimize system performance and resource usage.
* Implement auto-scaling for ECS Fargate.
* Perform deeper log analysis.