# PRIA FILMS – Portfolio Web Application

A full-stack portfolio website for an independent film production company, built with **React + Vite**, **Node.js/Express**, and **MongoDB**.

---

## Project Structure

```
pria-films/
├── client/          # React frontend (Vite + Tailwind + Framer Motion)
│   ├── src/
│   │   ├── api/         # Axios API functions
│   │   ├── components/  # Shared UI components
│   │   ├── hooks/       # React Query hooks
│   │   └── pages/       # Home, AboutUs, Portfolio, MovieDetail, ContactUs
│   └── ...
└── server/          # Node.js/Express REST API
    └── src/
        ├── config/      # DB connection
        ├── controllers/ # Route handlers
        ├── middleware/  # Error handler
        ├── models/      # Mongoose schemas
        ├── routes/      # Express routers
        └── seed/        # Database seeder
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Configure Environment

```bash
# Server
cp server/.env.example server/.env
# → Edit server/.env with your MONGODB_URI

# Client
cp client/.env.example client/.env
# → Edit client/.env if needed
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

### 4. Run Development Servers

```bash
# Terminal 1 – Backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 – Frontend (http://localhost:3000)
cd client
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/featured-movies` | Get featured films for Home page |
| `GET` | `/api/movies` | Paginated/filtered film list |
| `GET` | `/api/movies/:slug` | Single film detail |
| `GET` | `/api/about` | About page content |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/health` | Server health check |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Routing | React Router v6 |
| State/Cache | TanStack React Query |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose |
| Validation | Joi (server), Custom (client) |
| Security | Helmet, CORS, Rate Limiting |

---

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Railway](https://railway.app) or [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

---

© 2024 PRIA FILMS. All rights reserved.
