---
title: Frontend Setup
slug: /workshop/4.3-frontend/
description: Workshop content: setting up the SpendWise frontend with NextJS and Amplify.
thumbnail: /images/workshop/default-thumbnail.png
date: 2026-05-03
tags: ["workshop"]
category: workshop
author: FCAJ Team
status: published
---

## Overview

This section covers the SpendWise frontend setup. The app uses NextJS and is deployed through AWS Amplify, so the goal here is to get the frontend running locally and understand how it connects to the backend later on.

## What You Will Learn

- Set up the frontend project structure.
- Run the NextJS app locally.
- Understand how Amplify connects the frontend to the rest of the system.
- Prepare the frontend for authentication and API integration.

## Requirements

- Completed 4.2 Prerequisites.
- Node.js 22.x LTS.
- npm 11+ or pnpm.
- Git.
- Basic familiarity with NextJS and React.

## Content

## Frontend Setup

The frontend source code is already prepared. In this step, you only need to clone the project, install dependencies, and run it locally.

### 1. Clone the repository

```bash
git clone https://github.com/NeuraX-HQ/neurax-web-app.git
cd neurax-web-app
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Run the app locally

```bash
npm run dev
```

You should see the frontend in your browser. Some features may still use placeholder data until the backend and Amplify resources are connected.

### 4. What to check

- Layout loads correctly.
- Navigation between pages works.
- Language switching works if supported.
- Static content loads without errors.

---

[Continue to 4.4 Backend Setup](../4.4-Backend/)

## Conclusion

Once the frontend is running locally, you are ready to move on to the backend setup and connect the rest of the SpendWise stack.
