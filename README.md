# 🟢 Zealthy Onboarding Exercise 🟢
A custom multi-step onboarding application built for Zealthy that allows users to sign up and provide personal information through a configurable step-by-step process.

### User Flow
- **Step 1**: Email and password authentication  
- **Step 2**: Configurable fields (About Me, Address, and/or Date of Birth)  
- **Step 3**: Additional configurable fields (About Me, Address, and/or Date of Birth)  
- **Success Page**: Completion confirmation with data viewing options

Also included a header to navigate to the **Sign In**, **Data**, and **Admin** pages.

## Tech Stack

### 🔹 Frontend
- Next.js, TypeScript, Tailwind CSS, & React Context API

### 🔹 Backend
- Next.js API Routes, Prisma ORM, PostgresSQL, Supabase

## Main Form Components
- **About Me** – Text area for user description  
- **Address** – Street, City, State, Zip fields  
- **Date of Birth** – Date picker input

Note: these are conditionally rendered based on admin configuration.

## API Endpoints

| Endpoint                  | Method | Description                              |
|---------------------------|--------|------------------------------------------|
| `/api/user`               | POST   | Authenticate and create user             |
| `/api/user`               | PUT    | Update user profile data                 |
| `/api/user`               | GET    | Retrieve all users (Data page)           |
| `/api/admin-config`       | GET    | Fetch current admin-configured form      |
| `/api/admin-config`       | PUT    | Update onboarding form configuration     |

## Database Schema

### `User` Model
- ID, Email, Password, About Me, Address (Street, City, State, Zip), Date of Birth  
- `onboardingStep` field tracks progress  

### `AdminConfig` Model
- Defines which components are shown on which steps  
- ID, Component, Step Number

## ⚠️ Some Limitations

- No form input validation  
- No session management (e.g., tokens or cookies)  
- No authentication/security (e.g., password hashing)  
- Not scalable (e.g., lacks caching, error handling)  
- No testing coverage, no unit tests 

## Deployment Platform

This app is deployed via **Vercel**:  
🔗 [Live Demo](https://zealthy-engineering-exercise.vercel.app/)

