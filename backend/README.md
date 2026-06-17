# Task Manager — Backend

REST API for a task management application with JWT-based authentication and role-based access control (admin/member). Built with Express 5, PostgreSQL (Neon), and JWT.

## Prerequisites

- Node.js 18+
- PostgreSQL database (Neon Serverless)

## Installation

```bash
git clone <repo-url>
cd backend
npm install
```

## Configuration

Create a `.env` file in the backend root:

```env
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
JWT_SECRETA=secret_access
JWT_SECRETR=secret_refresh
```

## Usage

```bash
npm run dev      # starts with nodemon on port 5000
```

All API routes are prefixed with `/api`.

### Auth

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/signup`        | Register a member  |
| POST   | `/api/login`         | Login              |
| POST   | `/api/refresh-token` | Refresh access token |

### Tasks (authenticated)

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| GET    | `/api/tasks`             | List user tasks   |
| GET    | `/api/tasks/:id`         | Get single task   |
| POST   | `/api/tasks`             | Create task       |
| PATCH  | `/api/tasks/:id`         | Update task       |
| DELETE | `/api/tasks/:id`         | Delete task       |

### Admin (admin only)

| Method | Endpoint              | Description       |
| ------ | --------------------  | ----------------- |
| GET    | `/api/admin/all-users`| List all users    |

### Seed

```bash
node seed.js
```

Creates a default admin account.

## Running Tests

```bash
npm test
```

3 test files (9 tests total) using Vitest:

| File | Tests | What it validates |
|---|---|---|
| `middlewares/authenticate.test.js` | 3 | Valid token passes, missing token → 401, invalid token → 500 |
| `middlewares/authorize.test.js` | 3 | Non-admin → 403, admin passes, multi-role support |
| `controllers/task.controller.test.js` | 3 | Missing title → 400, missing description → 400, valid creation → 201 |

## License

ISC
