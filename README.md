# Zealthy Onboarding Flow

A custom multi-step onboarding application built for Zealthy that allows users to sign up and provide personal information through a configurable step-by-step process.

### User Flow

1. **Step 1**: Email and password authentication
2. **Step 2**: Configurable form components (About Me, Address, and/or Date of Birth)
3. **Step 3**: Additional configurable form components (About Me, Address, and/or Date of Birth)
4. **Success Page**: Completion confirmation with data viewing options

Also included a header to navigate to the Sign In, Data, or Admin pages.

## Tech Stack

### Frontend

-   **Next.js** - React framework with App Router
-   **TypeScript** - Type-safe JavaScript
-   **Tailwind CSS** - Utility-first CSS framework
-   **React Context** - State management for user session

### Backend

-   **Next.js API Routes** - Server-side API endpoints
-   **PostgreSQL** - Primary database
-   **Prisma ORM** - Database toolkit and query builder

### Main Form Components

-   **About Me**: Text area for user description
-   **Address**: Street, city, state, zip fields
-   **Date of Birth**: Date picker input

## API Endpoints

-   `POST /api/user` - User authentication
-   `PUT /api/user` - Update user data
-   `GET /api/user` - Fetch all users (data page)
-   `GET /api/admin-config` - Get form configuration
-   `PUT /api/admin-config` - Update form configuration

## Database Schema

### User Model

-   Authentication (email, password)
-   Personal data (aboutMe, address fields, dateOfBirth)
-   Progress tracking (onboardingStep)

### AdminConfig Model

-   Component assignment to steps
-   Dynamic form configuration

## Some Limitations

-   No validation for Form components
-   Lacking session management
-   No authetntication & security (ex. no password hashing)
-   Not scalable (ex. no caching)
-   No unit testing

## Deployment platform

I decided to host the site on Vercel. Here's the link: https://zealthy-engineering-exercise.vercel.app/
