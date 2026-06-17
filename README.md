# Task Manager

Full-stack task management application with role-based access (admin/member). Built with Next.js 16, Express 5, PostgreSQL (Neon), and JWT authentication.

## Project Structure

```
├── frontend/     # Next.js 16 App Router + Tailwind CSS
└── backend/      # Express 5 REST API + Neon PostgreSQL
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon Serverless)

### 1. Clone & Install

```bash
git clone <repo-url>
cd Task_Management_Next

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure environment

**Backend** — `backend/.env`:
```env
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
JWT_SECRETA=secret_access
JWT_SECRETR=secret_refresh
```

**Frontend** — `frontend/.env`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

### 3. Start the app

```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

### 4. Seed admin account (optional)

```bash
cd backend && node seed.js
```

### 5. Run tests

```bash
cd backend && npm test
```

## Documentation

- [Frontend README](./frontend/README.md) — routes, auth, dev server
- [Backend README](./backend/README.md) — API endpoints, config, tests
