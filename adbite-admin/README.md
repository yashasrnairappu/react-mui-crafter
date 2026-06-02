# Adbite Admin Panel

Admin panel for Adbite — an indoor advertising company based in Kerala, India.

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Axios (with `withCredentials: true`)
- React Router DOM v6
- Vite

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and set your API URL
cp .env.example .env

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```
VITE_API_URL=http://localhost:4000
```

## Project Structure

```
src/
├── api/index.ts          # Axios instance + all API calls
├── context/AuthContext.tsx
├── hooks/useToast.ts
├── components/
│   ├── Toast.tsx
│   ├── Navbar.tsx
│   ├── StatsBar.tsx
│   ├── CityTabs.tsx
│   ├── LocationCard.tsx
│   ├── LocationModal.tsx
│   └── DeleteModal.tsx
└── pages/
    ├── LoginPage.tsx
    └── DashboardPage.tsx
```

## API Expected Endpoints

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | /auth/login | `{ password }` | sets cookie |
| POST | /auth/logout | — | clears cookie |
| GET | /auth/verify | — | `{ valid: boolean }` |
| GET | /locations | — | `{ locations: Location[] }` |
| POST | /locations | FormData | `{ location }` |
| PUT | /locations/:id | FormData | `{ location }` |
| DELETE | /locations/:id | — | `{ message }` |

### FormData fields for POST/PUT:
- `name` — string
- `city` — "Pathanamthitta" | "Kottayam" | "Alappuzha"
- `stats` — JSON stringified object
- `existingImages` — JSON stringified array of URLs (PUT only)
- `images` — File(s)

## Auth Notes

- Token stored in **httpOnly cookie only** — never localStorage
- All axios requests use `withCredentials: true`
- Auth state verified on app load via `/auth/verify`
- Protected routes redirect to `/login` automatically

## Design System

- Background: `#0C0C0C` (main), `#141414` (secondary), `#1C1C1C` (cards)
- Accent: `#E8181E`
- Fonts: Syne (headings), DM Sans (body)
- Cities: Pathanamthitta, Kottayam, Alappuzha
