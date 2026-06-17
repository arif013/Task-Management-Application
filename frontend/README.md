# Task Manager — Frontend

Next.js 16 dashboard for managing tasks with role-based access (member/admin). Features server-side rendering, JWT auth, and a responsive sidebar layout.

## Prerequisites

- Node.js 18+
- Backend server running on `http://localhost:5000`

## Installation

```bash
cd frontend
npm install
```

## Configuration

Create a `.env` file in the frontend root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

## Usage

```bash
npm run dev      # starts on http://localhost:3000
```

### Member routes

| Route          | Description          |
| -------------- | -------------------- |
| `/dashboard`   | Task statistics      |
| `/my-tasks`    | CRUD tasks + filter  |
| `/settings`    | User settings        |

### Admin routes

| Route                     | Description          |
| ------------------------- | -------------------- |
| `/admin`                  | Admin dashboard      |
| `/admin/manage-users`     | View all users       |
| `/admin/manage-tasks`     | Manage all tasks     |

### Auth

| Route     | Description |
| --------- | ----------- |
| `/login`  | Sign in     |
| `/signup` | Register    |

## Running Tests

```bash
npm test
```

No tests configured yet.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Lucide icons

## License

MIT
