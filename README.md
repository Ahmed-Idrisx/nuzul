# Nuzul

Nuzul is a hotel discovery and booking platform for guests and property
owners. Guests can search destinations, explore hotel details, create bookings,
and manage their profile. Hotel owners can register properties and manage rooms
and bookings from the dashboard.

> **Project status: MVP**
>
> Nuzul is currently a functional Minimum Viable Product. The core guest,
> booking, hotel-owner, and support journeys are implemented for validation and
> demonstration. Some production platform capabilities, such as real payment
> processing, native mobile apps, advanced availability rules, and full
> observability, are intentionally outside the current MVP scope.

## MVP Scope

The current MVP focuses on validating the complete accommodation marketplace
journey:

- Guests can create accounts, verify email OTPs, search destinations, browse
  hotels and rooms, and manage bookings.
- Hotel owners can register a hotel, add rooms, and manage hotel bookings from
  the dashboard.
- Users can update profiles, recover passwords, contact support, and see
  recommendations based on recent searches.
- The frontend is connected to the Nuzul backend through a shared API client
  and authenticated cookie-based requests.

The MVP does not yet claim to provide a complete commercial platform. Payment
provider integration, advanced host pricing and availability, notifications,
analytics, moderation workflows, and native mobile distribution can be added in
later releases.

## Highlights

- Destination search with recent-search recommendations
- Hotel and room discovery pages
- Guest registration, login, OTP verification, and password recovery
- Booking management and authenticated user profiles
- Hotel owner dashboard for rooms and bookings
- Responsive home page with guest/host content, testimonials, FAQ, support,
  and app download sections
- React Query for server state and API caching
- React Hook Form and Zod for validated forms

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack React Query
- React Hook Form and Zod
- React Icons
- ESLint with Next.js Core Web Vitals rules

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- Access to the Nuzul API

## Getting Started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Set the API URL in `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=https://nuzul-backend.vercel.app/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command             | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the development server                       |
| `npm run lint`      | Run ESLint                                         |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run check`     | Run lint and TypeScript checks                     |
| `npm run build`     | Create a production build                          |
| `npm run start`     | Serve the production build                         |

Run the full local validation before opening a pull request:

```bash
npm run check
npm run build
```

## Project Structure

```text
app/                 App Router pages and route layouts
components/          Shared UI and home page sections
constant/            Site navigation and static content
context/             Authentication and application context
features/            Domain modules: auth, hotels, rooms, bookings, users
layout/              Application and dashboard shells
lib/                 API client, query client, and utilities
providers/           React Query, auth, toast, and app providers
public/              Public static assets
```

Feature modules keep their API calls, components, hooks, schemas, and types
together. Use the `@/*` path alias for imports from the project root.

## Environment Variables

| Variable              | Required | Description                       |
| --------------------- | -------- | --------------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the Nuzul backend API |

Only values that are safe to expose in the browser should use the
`NEXT_PUBLIC_` prefix. Never commit `.env.local`, access tokens, passwords, or
private API keys.

## API and Images

The API client reads `NEXT_PUBLIC_API_URL` and sends authenticated requests
with `credentials: "include"`. The default backend URL is used only when the
environment variable is not set.

Remote hotel images are currently allowed from `ik.imagekit.io` in
`next.config.ts`. Add any new image host explicitly to `images.remotePatterns`
before using it with `next/image`.

## Production Deployment

### Vercel

1. Import the repository into Vercel.
2. Set `NEXT_PUBLIC_API_URL` in the Preview and Production environments.
3. Deploy using the default Next.js build settings.
4. Verify authentication, hotel images, booking flows, and dashboard access
   against the production API.

The production commands are:

```bash
npm run build
npm run start
```

### Pre-release checklist

- Confirm the production API URL is configured.
- Run `npm run check` and `npm run build`.
- Verify `.env.local` and secrets are not staged by Git.
- Test login, OTP verification, password reset, search, booking, and logout.
- Test the home page and dashboard at mobile and desktop widths.
- Confirm remote images load from approved domains.
- Check browser cookies and CORS configuration on the API.

## Code Quality

Keep domain logic inside the relevant feature module, prefer existing shared
components, and avoid adding browser-only code to server components. New
changes should pass `npm run check` and the production build before merging.
