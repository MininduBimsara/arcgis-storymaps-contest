## ArcGIS StoryMaps Competition API (v1)

Node.js/Express REST API for the StoryMaps competition. Provides authentication, email verification, password reset, user profiles, categories, and submissions. Designed for cookie-based auth with a Next.js frontend.

### Table of Contents

- **Overview**
- **Tech Stack**
- **Architecture**
- **Environment Variables**
- **Running Locally**
- **API Surface (selected routes)**
- **Auth & Session Model**
- **Email Service**
- **Submissions & Categories**
- **Security, Logging & Ops**

## Overview

- Purpose: Back the competition frontend with secure auth, email flows, and submission management.
- Auth: HTTP-only cookie (JWT). CORS configured for `withCredentials` from the frontend.
- Email: Nodemailer SMTP for verification and reset flows.

## Tech Stack

- Runtime: Node.js + Express
- DB: MongoDB (Mongoose)
- Auth: JWT (in HTTP-only cookie)
- Mail: Nodemailer (SMTP/Ethereal for development)
- Validation: Custom validators under `validators/`
- Rate limiting & security middleware in `middleware/security.js`

## Architecture

- Entry: `server.js` → loads env, boots `app.js` → mounts `routes/` under `/api/v1`.
- Config: `config/env.js` loads defaults and validates required vars; `config/database.js` connects MongoDB.
- Layers:
  - Controllers (`controllers/*`): HTTP handlers; shape responses via `utils/responseHandler.js`.
  - Services (`services/*`): Business logic (e.g., `authService`, `emailService`).
  - Repositories (`repositories/*`): Data access and derived model operations.
  - Models (`models/*`): Mongoose schemas (`User`, `Submission`, `Category`).
  - Middleware (`middleware/*`): `protect`, validation, security, and error handling.
- Static: `/uploads/*` is served for assets.

Directory highlights:

- `routes/index.js` mounts feature routes: `auth`, `users`, `submissions`, `categories`.
- `app.js` sets CORS, compression, cookies, security headers, health checks.
- `middleware/errorHandler.js` provides async handler and centralized error responses.

## Environment Variables

Required:

```
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/storymaps_competition
```

Recommended:

```
NODE_ENV=development
PORT=5000
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000

# SMTP (Email)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_EMAIL=noreply@storymapscompetition.com

# Frontend base URL for email links
FRONTEND_URL=http://localhost:3000
```

Defaults are applied by `config/env.js` for many values (e.g., `PORT`, `API_VERSION`, `CORS_ORIGIN`). Missing required vars cause a startup exit.

## Running Locally

1. Install deps:

```
npm install
```

2. Create `.env` with the variables above.

3. Start the API:

```
npm run dev
# or
npm start
```

4. Health checks:

- Root: `GET /` → basic JSON banner
- API: `GET /api/v1/health` → status/version
- App: `GET /health` → environment and timestamp

## API Surface (selected routes)

Base path: `/api/v1`

Auth (`routes/auth.js`):

- `POST /auth/register` — Create user, set cookie, send verification email
- `POST /auth/login` — Authenticate, set cookie
- `POST /auth/logout` — Clear cookie
- `GET  /auth/me` — Current user (protected)
- `POST /auth/verify-email` — Verify email via token
- `POST /auth/forgot-password` — Send reset email
- `POST /auth/reset-password` — Reset with token
- `POST /auth/change-password` — Change password (protected)
- `POST /auth/refresh` — Issue fresh JWT (protected)
- `POST /auth/resend-verification` — Resend verification email

Users (`routes/users.js`):

- `GET  /users/profile` — Current profile (protected)
- `PUT  /users/profile` — Update profile (protected)

Categories (`routes/categories.js`):

- `GET  /categories` — Active categories
- `GET  /categories/slug/:slug` — Find by slug
- `GET  /categories/:id/stats` — Aggregated submission stats

Submissions (`routes/submissions.js`):

- `POST   /submissions` — Create (protected)
- `GET    /submissions` — List (query filters, pagination)
- `GET    /submissions/public` — Public list
- `GET    /submissions/:id` — Details
- `PUT    /submissions/:id` — Update (owner/admin)
- `DELETE /submissions/:id` — Delete (owner/admin)
- `GET    /submissions/my-submissions` — Current user’s submissions
- `GET    /submissions/category/:categoryId` — By category
- `GET    /submissions/:id/storymap` — Embed helper (title/iframe)
- Admin helpers (if authorized): `/submissions/stats`, `/submissions/:id/status`, `/submissions/bulk-approve`

## Auth & Session Model

- JWT is generated server-side and stored in an HTTP-only `token` cookie: `secure` and `sameSite` tuned by `NODE_ENV`.
- Middleware `protect` validates JWT, attaches `req.user`, and authorizes protected routes.
- Rate limiters (`middleware/security.js`) throttle sensitive routes like `auth` and password reset to reduce abuse.

Login/registration flow:

1. Register → create user with `emailVerificationToken` (24h expiry) → send verification email.
2. Verify email via `POST /auth/verify-email` → mark `emailVerified: true`.
3. Login → verify credentials and email verified → set JWT cookie → return user.

Password reset flow:

1. `POST /auth/forgot-password` → create short-lived `passwordResetToken` → email reset link.
2. `POST /auth/reset-password` with `token` + new password → update credentials; clear reset fields.

## Email Service

- Implemented in `services/emailService.js` using Nodemailer.
- Three templates:
  - `sendEmailVerification(user, verificationUrl)` — 24h expiry
  - `sendPasswordReset(user, resetUrl)` — short expiry (≈10m)
  - `sendSubmissionConfirmation(user, submission)` — on create
- SMTP config from env; in development without SMTP configured, the service can use an Ethereal transport for testing.
- All sends are logged via `utils/logger.js`.

## Submissions & Categories

- Submissions include StoryMap URL, team members, tags, and data sources. Server validates payloads (`validators/submissionValidator.js`) and enforces per-user limits (see defaults in env).
- Categories expose public lists and stats endpoints for frontend filtering and insights.

## Security, Logging & Ops

- CORS: `CORS_ORIGIN` supports multiple comma-separated origins and enables credentials.
- Cookies: `httpOnly`, `secure` in production, `sameSite` configured for cross-site scenarios.
- Headers: Basic hardening via `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`.
- Rate limiting: Applied to auth and reset endpoints via `middleware/security.js`.
- Logging: `utils/logger.js` integrates with transports; system logs exceptions and rejections to `logs/`.
- Health: `/health` and `/api/v1/health` endpoints for uptime checks.

---

This API powers the Ceylon Stories frontend with a secure, email-first onboarding and a submissions workflow optimized for ArcGIS StoryMaps.
