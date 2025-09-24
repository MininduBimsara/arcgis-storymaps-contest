## Ceylon Stories — ArcGIS StoryMaps Competition Frontend (v1)

A modern Next.js (App Router) frontend for the 2025 ArcGIS StoryMaps competition. Users can register, authenticate, and submit ArcGIS StoryMaps entries. The app integrates tightly with the backend API over cookie-based auth and provides a submission-focused UX with robust client validations.

### Table of Contents

- **Overview**
- **Tech Stack**
- **Project Structure**
- **Architecture**
- **Routing**
- **State & Auth**
- **API Client & Backend Integration**
- **Protected Routes & Auth Lifecycle**
- **Submissions Flow**
- **ArcGIS Integration**
- **Email & Account Security Flows**
- **Environment Variables**
- **Running Locally**
- **Build & Deploy**
- **Security, UX, and Performance Notes**
- **Future Enhancements (v2 ideas)**

## Overview

- **Goal**: Provide a smooth experience to join the competition, authenticate, and submit StoryMaps with supporting metadata.
- **Key Features**:
  - Global authentication with optimistic hydration and guarded redirects
  - Typed Axios API client with cookie-based auth (`withCredentials`)
  - Rich submission form (dynamic arrays, tags, validations)
  - ArcGIS assets preloaded for stable map embedding
  - Tailwind v4 design system with Inter font and lucide-react icons

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, Inter font
- **HTTP**: Axios (single instance, interceptors, cookie auth)
- **Validation**: Custom client-side validation (regex + constraints)
- **ArcGIS**: `@arcgis/core` 4.x, ArcGIS JS/CSS loaded globally
- **Icons**: `lucide-react`
- **Tooling**: ESLint 9, Prettier, Turbopack for fast dev/build

## Project Structure

```
frontend/
  app/                    # App Router pages (e.g., /, /auth, /submissions)
  components/             # UI and feature components
    arcgis/               # ArcGIS embed/util components
    submissions/          # CreateSubmission and listing
    layout/               # Navigation, Footer
  context/
    AuthContext.tsx       # Global auth provider & hooks
  lib/
    api.ts                # Typed Axios client, endpoints, models
  styles/                 # globals.css, component styles
  public/                 # images, manifest, icons
  next.config.ts          # images, env, webpack
  README.md               # this document
```

## Architecture

- **App Shell**: `app/layout.tsx` defines metadata, loads ArcGIS CSS/JS, wraps app with `AuthProvider`, and renders global `Navigation`.
- **UI Composition**: Pages are composed from feature components (hero, overview, forms).
- **Typed API Layer**: `lib/api.ts` exposes typed methods and models for Auth, Users, Categories, and Submissions. All requests go through a single Axios instance with `withCredentials: true`.
- **Auth Context**: `context/AuthContext.tsx` owns user state, login/register/logout/update, and refresh. It performs optimistic hydration from `localStorage` and verifies with `/auth/me`.

### What makes this v1 interesting

- **Cookie-first auth with smart redirects**: The Axios interceptor deliberately limits 401 redirects to true auth contexts or protected views to avoid interrupting long forms (e.g., submission wizard).
- **Optimistic UX with server truth**: The app hydrates immediately from `localStorage` for snappy UI, then reconciles against the backend. If the session is invalid, it clears the cache gracefully.
- **Typed API surface**: `lib/api.ts` models `User`, `Category`, and `Submission`, returning consistent `ApiResponse` shapes that simplify error handling in the UI.
- **ArcGIS-friendly runtime**: Global ArcGIS CSS/JS is loaded once; embed helpers and image domains are configured to avoid content blocking and layout shifts.

## Routing

- **Home**: `/` — Hero, overview, resources
- **Auth**: `/auth` — unified Sign In / Sign Up with forgot-password flow
- **Submissions**:
  - `/submissions/create` — protected create flow (redirects to `/auth` if not signed in)
  - `/submissions` — listing page (public) [present in project structure]
  - `/submissions/[id]` — details view [present in project structure]
- **Profile**: `/profile` — protected (guarded in client + interceptor)

## State & Auth

- **Optimistic Hydration**: On boot, we read `auth_user` from `localStorage` for UX responsiveness, then confirm via `/auth/me`. If server disagrees, cache is cleared.
- **Guarded Redirects**: The Axios interceptor only redirects on `401` for auth endpoints or protected routes, avoiding disruptive redirects during forms (e.g., `/submissions/create`).
- **Auth API**: `login`, `register`, `logout`, `getCurrentUser`, `updateProfile`, `resendVerificationEmail`, etc. All persist cookies (no tokens in localStorage).

## API Client & Backend Integration

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL` with fallback `http://localhost:5000/api/v1`.
- **Cookies**: `withCredentials: true` so the backend sets/reads auth cookies.
- **Interceptor Strategy**:
  - Normalizes errors to `{ status, error, data }`.
  - On `401`, redirects only if the request was an auth route or we are on a protected page, and not during submission.
- **Endpoints (selection)**:
  - Auth: `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/me`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/resend-verification`, `/auth/change-password`
  - Users: `/users/profile` (GET/PUT)
  - Categories: `/categories`, `/categories/slug/:slug`, `/categories/:id/stats`
  - Submissions: `/submissions` CRUD, `/submissions/public`, `/submissions/top`, `/submissions/search`, `/submissions/my-submissions`, `/submissions/:id/storymap`, status/bulk admin endpoints

### How the frontend talks to the backend

- **Session**: Auth is cookie-based. The frontend never stores access tokens; the browser manages cookies sent via `withCredentials: true`.
- **CORS**: Backend must allow the frontend origin and `Access-Control-Allow-Credentials: true`.
- **Error discipline**: The API layer returns a consistent object even for axios failures, so UI components don’t handle raw axios error shapes.
- **Protecting UX during 401s**: The interceptor checks current route and endpoint to avoid bouncing the user out of multi-step flows unless strictly necessary.

### Mapping (examples)

- `AuthContext.login` → `POST /auth/login` → cookie set by server → `GET /auth/me` confirms session.
- Forgot password (from `/auth`) → `POST /auth/forgot-password` → email link → `ResetPassword` uses `POST /auth/reset-password`.
- Email verification (`/verify-email`) → `POST /auth/verify-email` with token → `AuthContext.refreshUser()` picks up verified state thereafter.

> Backend reference: `backend/routes/auth.js`, `backend/services/emailService.js` describe all auth/email endpoints and SMTP configuration.

## Protected Routes & Auth Lifecycle

- **Protected pages**: Client marks routes like `/profile` as protected. The Axios interceptor also recognizes protected paths and triggers redirect to `/auth` on 401.
- **During sensitive operations**: On `/submissions/create`, the app avoids refreshing user state in the background to prevent accidental state resets while the user is filling the form.
- **Lifecycle**:
  1. App boots → optimistic hydrate from `auth_user`.
  2. Verify with `/auth/me` → reconcile state; if unauthenticated, clear cache.
  3. On navigations or actions, failures are normalized; only strict 401s on protected contexts trigger redirect.

## Submissions Flow

- **CreateSubmission Component**: Rich, multi-section form that:
  - Validates title, description length; category/region presence
  - Validates StoryMaps URL against `storymaps.arcgis.com/stories/...` or `arcg.is/...`
  - Supports dynamic arrays for team members and data sources (with per-row validation)
  - Supports up to 10 tags and up to 5 preview images
  - Requires copyright compliance confirmation
- **Auth Gate**: Redirects to `/auth` when not logged in. If logged in but `emailVerified === false`, prompts to resend verification email via backend.
- **Submit**: Normalizes `SubmissionData` and `POST /submissions`, then navigates to `/submissions?success=true` on success.

## ArcGIS Integration

- **Global Assets**:
  - CSS: `<link href="https://js.arcgis.com/4.28/esri/themes/light/main.css" rel="stylesheet" />`
  - JS: `<script src="https://js.arcgis.com/4.28/" async />`
- **Image Domains**: `next.config.ts` whitelists `*.arcgis.com`, `www.arcgis.com`, `utility.arcgis.com`, `services.arcgis.com`, and Unsplash for optimized images.
- **Embedding**: A `StoryMapEmbed` component is scaffolded, and a backend helper endpoint `/submissions/:id/storymap` exists to consolidate embed data.

## Email & Account Security Flows

The app implements three email-driven flows that integrate with the backend mailer (`backend/services/emailService.js`, SMTP via Nodemailer):

### 1) Registration → Verify Email

- User signs up on `/auth` → backend creates user and sends a verification email with a tokenized link.
- Email is sent using `EmailService.sendEmailVerification(user, verificationUrl)` with a 24-hour expiry.
- User clicks link → lands on `/verify-email?token=...` which calls `POST /auth/verify-email`.
- On success, the page shows a success state and prompts to sign in. On expiry, it offers to resend the verification email via `POST /auth/resend-verification`.

Related UI: `components/verify-email/emailVerify.tsx`

### 2) Forgot Password → Reset Password

- From `/auth`, user opens the forgot-password form and submits email → `POST /auth/forgot-password`.
- Backend sends a reset email using `EmailService.sendPasswordReset(user, resetUrl)` with a 10-minute expiry.
- User follows the link to `/reset-password?token=...` → `components/password-reset/ResetPassword.tsx` renders a secure form.
- On submit, it calls `POST /auth/reset-password` with token + new password, then shows a success state and a one-click sign-in CTA.

### 3) Resend Verification

- If verification fails or expired, user can request a resend via `POST /auth/resend-verification` (rate-limited by backend middleware).

### SMTP & Local Testing

- Backend uses Nodemailer with `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
- In development without SMTP, an Ethereal transport can be used (see service for details). Inspect the mail log or Ethereal inbox for links.

### Security Notes for Email Links

- Verification tokens expire in 24h; reset tokens in ~10 minutes (configurable server-side).
- Links are POST-validated server-side; the frontend only relays tokens and renders outcomes.
- Rate limiting middleware protects `auth` and `reset` routes from abuse.

## Environment Variables

- At minimum set in your env (e.g., `.env.local`):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
# Optional if you use client-side ArcGIS APIs that require a key
ARCGIS_API_KEY=your_arcgis_api_key_here
```

Backend (for reference):

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_EMAIL=noreply@storymapscompetition.com
```

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Ensure backend is running and CORS is configured for cookies (`Access-Control-Allow-Credentials: true`, allowed origin pointing to `http://localhost:3000`).
3. Create `.env.local` with `NEXT_PUBLIC_API_URL`.
4. Start dev server (Turbopack):

```bash
npm run dev
```

5. Visit `http://localhost:3000`.

### Testing email flows locally

- Register a new account on `/auth` → check logs/Ethereal inbox for the verification link.
- Visit `/verify-email?token=...` after clicking the link from the email.
- Use the forgot-password form on `/auth` to trigger a reset email and complete the flow at `/reset-password?token=...`.

## Build & Deploy

- Build:

```bash
npm run build
```

- Start production server:

```bash
npm start
```

- Provide at deploy time:
  - `NEXT_PUBLIC_API_URL` pointing to your backend (e.g., `https://api.example.com/api/v1`)
  - If using client ArcGIS APIs, `ARCGIS_API_KEY`
- Next Image domains must include any CDN/static hosts used in production (already includes ArcGIS and Unsplash patterns).

## Security, UX, and Performance Notes

- **Security**
  - Cookie-based auth; no tokens stored in `localStorage`.
  - Optimistic hydration is UX-only; server `/auth/me` is the source of truth.
  - Protected pages enforced both via client checks and interceptor-aware redirects.
- **UX**
  - First-error visibility cues on forms (`.error-field`), explicit validation messages, and helpful counters (e.g., title/description length).
  - Auth screen locks scroll and provides clear transient redirect feedback.
- **Performance & SEO**
  - Preconnects to fonts/images, global metadata (Open Graph/Twitter), deferred ArcGIS JS, early ArcGIS CSS.
  - Turbopack for faster dev/build cycles.

## Future Enhancements (v2 ideas)

- Adopt `react-hook-form` + `zod` for schema-based validations and error reporting.
- Add a reusable protected-route helper/hook for consistent access control.
- Implement and harden `StoryMapEmbed` with graceful fallbacks and loading states.
- Enhance listing pages with filters, sorting, and server-side pagination.
- Add admin UI for moderation, status changes, and analytics.

---

Made with Next.js, Tailwind, and ArcGIS to highlight stories from Sri Lanka with a great submission experience.
