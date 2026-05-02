### Objectives of Week 3

* Deploy the backend application to AWS.
* Integrate user authentication system.
* Connect the frontend with backend APIs.

### Tasks Completed During the Week

| Day | Task | Start Date | End Date | References |
|-----|------|------------|----------|------------|
| 1 | - Configure Amazon Cognito <br>&emsp; + Create User Pool for registration and login <br>&emsp; + Define user attributes | 23/03/2026 | 23/03/2026 | - |
| 2 | - Build backend Docker image <br>&emsp; + Containerize NestJS application <br>&emsp; + Verify image locally | 24/03/2026 | 24/03/2026 | - |
| 3 | - Push Docker image to Amazon ECR | 25/03/2026 | 25/03/2026 | - |
| 4 | - Deploy ECS Service on Fargate <br>&emsp; + Configure Task Definition <br>&emsp; + Integrate with ALB | 26/03/2026 | 26/03/2026 | - |
| 5 | - Set up frontend on AWS Amplify <br>&emsp; + Connect Git repository <br>&emsp; + Configure build pipeline | 27/03/2026 | 27/03/2026 | - |
| 6 | - Configure environment variables <br>&emsp; + Inject API URL and Cognito IDs <br>&emsp; + Ensure consistency across environments | 28/03/2026 | 28/03/2026 | - |
| 7 | - Perform end-to-end testing <br>&emsp; + Test login flow and API calls <br>&emsp; + Validate full system workflow | 29/03/2026 | 29/03/2026 | - |

### Weekly Achievements

* Backend application was successfully deployed on ECS Fargate.
* User authentication system using Cognito is fully operational.
* Frontend can communicate with backend APIs seamlessly.

### Challenges & Lessons Learned

* **Challenge:** Environment variable mismatches between local and cloud environments caused authentication issues.
* **Solution:** Standardized naming conventions and environment configuration processes.
* **Lesson Learned:** Early end-to-end testing is crucial for identifying integration issues.

### Plan for Next Week

* Deploy database using Amazon RDS.
* Improve system security and secrets management.
* Configure HTTPS and custom domain.