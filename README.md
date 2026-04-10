# Clean Auth Template

A production-ready full-stack authentication template built with React, TypeScript, Node.js, and MongoDB.

## Features

- **JWT Authentication** — Secure login/register with token-based auth, auto-attached to all requests
- **Role-based Access** — Admin, User, and Visitor roles with middleware enforcement
- **Dark Mode** — Class-based dark mode via Tailwind CSS + nightwind plugin
- **Docker MongoDB** — MongoDB running in Docker with a single compose command
- **Profile Management** — Update displayname, email, and change password
- **Protected Routes** — Frontend redirect guard for unauthenticated users
- **Persistent Auth** — Token and user stored in localStorage, restored on page reload

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS 3.4, React Router 6, Axios
- **Backend:** Node.js, Express 4, Mongoose 8, JWT, bcryptjs, express-validator
- **Database:** MongoDB 7 (via Docker)

## Quick Start

### 1. Start MongoDB
```bash
cd database
bash docker-commands.sh 
# có init-mongo; Dockerfile; docker-commands.sh
```

### 2. Start the backend
```bash
cd server
cp .env.example .env   # edit if needed
npm install
npm run server
# Runs on http://localhost:3010
```

### 3. Start the frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. Login
Default admin account: `admin` / `Admin@123456`

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | public | Create account |
| POST | `/api/auth/login` | public | Login, returns JWT |
| GET | `/api/auth/me` | auth | Get own profile |
| PUT | `/api/auth/me` | auth | Update own profile |
| GET | `/api/auth/logout` | auth | Logout |

## Environment Variables

**server/.env**
```
PORT=3010
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=qnews
JWT_SECRET=mysecretkey123456
JWT_EXPIRE=7d
```

**frontend/.env**
```
VITE_API_BASE=http://localhost:3010
```

## Building on this template

This template gives you a working auth foundation. To extend it:

1. **Add a new resource** — Create `server/models/Thing.js`, `server/controller/thingCtrl.js`, `server/routes/thingRoute.js`, then mount it in `server/index.js`
2. **Add a new page** — Create `frontend/src/pages/ThingPage.tsx`, add the route in `App.tsx`, and use `apiGet`/`apiPost` from `api/api.tsx`
3. **Add API functions** — Use `apiGet`, `apiPost`, `apiPut`, `apiDelete` from `frontend/src/api/api.tsx` for type-safe HTTP calls
4. **Protect a route** — Add `auth` middleware on the server; wrap the frontend page with an `isAuthenticated` check using `useAuth()`
