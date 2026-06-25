# LMS Frontend

A multi-role learning management system frontend built with React and Vite. The app supports role-based access for `ADMIN`, `TEACHER`, and `STUDENT`, along with dedicated dashboards, authentication, course browsing, cart, profile, and administration pages.

## Overview

This repository contains the client-side application for an online learning platform. It includes:

- Public pages: home, courses, pricing, teams, resources, profile, and cart
- Authentication flows: login and register
- Role-based dashboards for admin, teacher, and student users
- Route protection based on authentication and role
- Global UI features such as dark mode, toast notifications, smooth scrolling, error boundaries, and app-wide error handling

## Key Features

- Lazy-loaded routes to keep the initial bundle smaller
- Route guarding through `PrivateRoute` and `RoleBasedGuard`
- Automatic profile fetch on app startup
- Axios token refresh flow when a `401` response is received
- Dark mode state synchronized with Redux
- Dashboard layout with a sidebar, navbar, and a dedicated scroll container
- Authentication forms powered by `react-hook-form` and `zod`
- Google sign-in support through a configurable environment variable
- Toast notifications, global error handling, and a fallback page for system errors

## Tech Stack

- React 18
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- React Hook Form
- Zod
- Recharts
- Lucide React

## Requirements

- Node.js 18 or newer is recommended
- npm comes with Node.js
- A backend API must be available; the frontend defaults to `http://localhost:8082`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file if you need to override API settings:

```bash
.env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build locally:

```bash
npm run preview
```

6. Run lint checks:

```bash
npm run lint
```

## Environment Variables

The frontend recognizes the following environment variables:

- `VITE_API_URL`: Base URL for the backend API
- `VITE_GOOGLE_AUTH_URL`: Google authentication redirect URL

Example:

```env
VITE_API_URL=http://localhost:8082
VITE_GOOGLE_AUTH_URL=http://localhost:8080/api/v1/auth/google
```

If these variables are not defined, the app falls back to:

- API base URL: `http://localhost:8082`
- Google auth URL: `http://localhost:8080/api/v1/auth/google`

## Authentication Flow

- Login and register forms use Zod validation
- Axios is configured with `withCredentials: true`
- When the backend returns `401`, the client attempts to refresh the token through `/v1/auth/refresh-token`
- If refresh fails, the request is rejected and the UI can handle the failure state

## Routes

### Public Routes

-    `/`
-    `/courses`
-    `/courses/:courseId`
-    `/pricing`
-    `/teams`
-    `/resources`
-    `/profile`
-    `/cart`
-    `/login`
-    `/register`
-    `/oops`

### Admin Routes

-    `/admin/dashboard`
-    `/admin/courses`
-    `/admin/revenue`
-    `/admin/orders`
-    `/admin/payments`
-    `/admin/users`
-    `/admin/audit`
-    `/admin/approvals`
-    `/admin/settings`
-    `/admin/banners`

### Teacher Routes

-    `/teacher/dashboard`
-    `/teacher/courses`
-    `/teacher/students`
-    `/teacher/messages`
-    `/teacher/revenue`
-    `/teacher/reviews`
-    `/teacher/settings`
-    `/teacher/create-course`

### Student Routes

-    `/student/dashboard`
-    `/student/courses`
-    `/student/explore`
-    `/student/certificates`
-    `/student/messages`
-    `/student/settings`

## Project Structure

```text
src/
  api/          Axios instance and API helpers
  assets/       Global styles and static assets
  components/   Shared UI, layout pieces, and admin components
  data/         Static data for public pages
  hooks/        Custom hooks for auth, localStorage, and stats
  layouts/      Public, auth, and dashboard layouts
  pages/        Page components grouped by user role
  routes/       Route guards and protection helpers
  store/        Redux store and slices
  utils/        Constants, formatters, and validators
```

## State Management

- The Redux store is defined in `src/store/store.js`
- The `auth` slice manages authentication state, profile data, loading, and errors
- The `ui` slice manages dark mode and sidebar state

## Implementation Notes

- The app uses `withCredentials`, so the backend must support the expected CORS and cookie/session behavior
- If the backend endpoints change, update `VITE_API_URL` or `VITE_GOOGLE_AUTH_URL`
- The `dist/` directory is build output and should not be committed

## Quick Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Possible Next Additions

If needed, this README can be expanded with:

- Detailed backend integration instructions
- Screenshots of the UI
- Demo accounts for each role
- Deployment steps for Vercel, Netlify, or a custom server
