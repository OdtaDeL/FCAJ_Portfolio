---
title: Backend Setup
slug: /workshop/4.4-backend/
description: Workshop content: preparing the SpendWise backend foundation with AWS Amplify Gen 2.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

This section prepares the backend foundation for SpendWise. The backend is built with AWS Amplify Gen 2 and split into authentication, data, storage, and functions.

## What You Will Learn

- Initialize the Amplify backend project.
- Understand the amplify/ directory structure.
- Prepare authentication, data, storage, and function layers.
- Deploy a sandbox environment for local development.

## Requirements

- Completed 4.3 Frontend Setup.
- Node.js 22.x LTS.
- npm 11+ or pnpm.
- AWS CLI configured with admin access.
- Basic TypeScript and serverless knowledge.

## Content

## Backend Initialization

SpendWise uses Amplify Gen 2 for the backend foundation. The first step is to create the backend workspace and install the required dependencies.

### 1. Initialize the backend folder

```bash
cd neurax-web-app
mkdir backend
cd backend
```

### 2. Install dependencies

```bash
npm create amplify@latest --yes
npm install
```

### 3. Start a sandbox environment

```bash
npx ampx pipeline-deploy --branch main --app-id [YOUR_APP_ID]

# Or for local work:
npx ampx sandbox
```

## Resource Layer Details

The backend is split into these main layers inside the amplify/ directory:

1. [Authentication Layer (Auth)](4.4.1-Auth/)
2. [Data Layer (Data)](4.4.2-Data/)
3. [Storage Layer (Storage)](4.4.3-Storage/)
4. [Logic Functions (Functions)](4.4.4-Functions/)

---

[Continue to 4.5 ECS Container Layer](../4.5-ECS-Fargate/)

## Conclusion

After this setup, the backend foundation is ready. Next, you can move into the resource layers that power authentication, data handling, storage, and custom logic for SpendWise.
