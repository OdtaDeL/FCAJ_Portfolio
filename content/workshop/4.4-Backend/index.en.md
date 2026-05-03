

## Overview

We will initialize the data heart of NutriTrack using TypeScript source code. This section covers setting up the backend infrastructure using AWS Amplify Gen 2, which provides a powerful framework for building serverless applications with authentication, data storage, and API capabilities.

## What You Will Learn

- Set up AWS Amplify Gen 2 project structure
- Configure backend infrastructure with TypeScript
- Deploy sandbox environments for development
- Understand resource layer organization
- Initialize authentication, data, storage, and function layers

## Requirements

- Completed Frontend Setup section
- Node.js 22+ and npm installed
- AWS CLI configured with admin credentials
- Basic understanding of TypeScript and serverless concepts

## Content

## Backend Initialization

We will initialize the data heart of NutriTrack using TypeScript source code.

## 1. Initialize Backend Directory

Create a separate directory to manage the infrastructure:

```bash
cd neurax-web-app
mkdir backend
cd backend
```
## 2. Install Dependencies

```bash
npm create amplify@latest --yes
npm install
```

## 3. Sandbox Deployment (First Time)

Use the Amplify CLI (Gen 2) to initialize the project and deploy your personal Sandbox environment:

```bash
npx ampx pipeline-deploy --branch main --app-id [YOUR_APP_ID]

# Or run the following for local work:
npx ampx sandbox
```
![ampx-sandbox-start.png](/images/ampx-sandbox-start.png)

---

## Resource Layer Details:

Now, we will define the core configuration files located within the `amplify/` directory:

1. [Authentication Layer (Auth)](4.4.1-Auth/)
2. [Data Layer (Data)](4.4.2-Data/)
3. [Storage Layer (Storage)](4.4.3-Storage/)
4. [Logic Functions (Functions)](4.4.4-Functions/)

---

[Continue to 4.5 ECS Container Layer](../4.5-ECS-Fargate/)

## Conclusion

By completing this backend setup, you have established the foundation for NutriTrack's serverless infrastructure using AWS Amplify Gen 2. The backend is now ready for implementing the specific resource layers including authentication, data storage, and serverless functions that will power the nutrition tracking application.
