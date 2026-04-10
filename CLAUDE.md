# CLAUDE.md - Clean Auth Template

## Overview
This is a clean full-stack authentication template. Frontend React + TypeScript + Vite + Tailwind CSS. Backend Node.js/Express + MongoDB (Mongoose). Database MongoDB via Docker.

## Project Structure
```
/
├── frontend/          # React + TypeScript + Vite + Tailwind
├── server/            # Node.js + Express + MongoDB
└── database/          # Docker + MongoDB init
```

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS 3.4, React Router 6, Axios, Redux Toolkit
- **Backend:** Express 4, Mongoose 8, JWT (jsonwebtoken), bcryptjs, express-validator
- **DB:** MongoDB on port 27017, database name `qnews`
- **Font:** Work Sans (Google Fonts) + Material Symbols Outlined (icon font)
- **Dark mode:** nightwind plugin (class-based)

## Running
- Server: `cd server && npm run server` (nodemon, port from .env, default 3010)
- Frontend: `cd frontend && npm run dev` (Vite, default 5173)
- Database: `cd database && bash docker-commands.sh`

## Environment Variables
### server/.env
- `PORT=3010`
- `DB_HOST=localhost`, `DB_PORT=27017`, `DB_DATABASE=qnews`
- `JWT_SECRET=mysecretkey123456`, `JWT_EXPIRE=7d`
- Admin: `admin` / `Admin@123456`

### frontend/.env
- `VITE_API_BASE=http://localhost:3010`

## Frontend Architecture

### Routes (`App.tsx`)
| Path | Page |
|------|------|
| `/` | Dashboard |
| `/profile` | ProfilePage |
| `/login` | LoginPage |
| `/register` | RegisterPage |

### Key Files
```
frontend/src/
├── api/api.tsx              # Axios client + auth API functions + generic helpers
├── types/index.ts           # User, LoginCredentials, RegisterPayload, ApiResponse, LoginResponse
├── hooks/useAuth.ts         # localStorage token/user management
├── store/                   # Redux Toolkit + redux-persist
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky header, user menu, dark mode toggle
│   │   ├── Footer.tsx       # Footer
│   │   └── MainLayout.tsx   # Wrapper: Header + children + Footer
│   ├── shared/
│   │   └── Icon.tsx         # Material Symbols wrapper
│   └── DarkModeToggle.tsx   # Dark mode switch
└── pages/
    ├── Dashboard.tsx         # Protected home: welcome, user info, dark mode demo, logout
    ├── ProfilePage.tsx       # Update displayname/email + change password
    ├── LoginPage.tsx         # Login form
    └── RegisterPage.tsx      # Register form
```

### API Functions (`api/api.tsx`)
```
apiLogin(username, password)  POST /api/auth/login
apiRegister(payload)          POST /api/auth/register
apiGetMe()                    GET  /api/auth/me
apiUpdateMe(payload)          PUT  /api/auth/me
apiLogout()                   GET  /api/auth/logout

// Generic helpers
apiGet(path, params?)
apiPost(path, payload?)
apiPut(path, payload?)
apiDelete(path)
```

### TypeScript Types (`types/index.ts`)
- `User`: _id, username, displayname, mobile?, email, role (Admin|User|Visitor), isBlocked, createdAt, updatedAt
- `ApiResponse<T>`: success, data?, msg?, error?
- `LoginCredentials`, `LoginResponse`, `RegisterPayload`

### Auth Flow
1. Login → POST `/api/auth/login` → server returns `{ success, data: { token, user } }`
2. Frontend stores `token` and `user` in localStorage
3. Axios interceptor auto-attaches `Authorization: Bearer <token>` header
4. `useAuth()` hook reads localStorage on mount, exposes `isAuthenticated`, `login()`, `logout()`

## Server Architecture

### Entry: `index.js`
Express → CORS → body-parser → auth routes → error handlers

### Route: `/api/auth` → `routes/authRoute.js`
All user/auth endpoints. Key ones: POST /register, POST /login, GET /me, PUT /me, GET /logout

### Auth Middleware (`middlewares/authMiddleware.js`)
- `auth` — verifies Bearer JWT
- `notVisitor` — blocks Visitor role
- `onlyAdminCanAccess` — Admin only

### User Roles
- `Admin` — full access
- `User` — standard authenticated user
- `Visitor` — default on register, limited access

### Server Response Format
All endpoints: `{ success: boolean, msg: string, data: any }`
Login: `{ success, msg, data: { token, user } }`

## How to Add New Features

1. **New model:** `server/models/Thing.js` (Mongoose schema)
2. **New controller:** `server/controller/thingCtrl.js`
3. **New routes:** `server/routes/thingRoute.js`, mount in `server/index.js`
4. **New API calls:** add to `frontend/src/api/api.tsx` or use `apiGet`/`apiPost` generics
5. **New page:** `frontend/src/pages/ThingPage.tsx`, add route in `App.tsx`

## Tailwind Config
- Primary: `#1152d4`
- Background light: `#f6f6f8`, dark: `#101622`
- Font: `Work Sans`
