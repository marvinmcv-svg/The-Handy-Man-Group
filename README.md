# The Handyman & Carpentry Group

Premium website for The Handyman & Carpentry Group — a family-owned carpentry, handyman, renovation and structural landscaping business based in Brisbane, Queensland. Founded by Joe & Claudia in 2017 (formerly Joe Lewis Handyman). QBCC licensed, Master Builders Queensland members.

Built with the **Drill design system** — modern industrial sophistication with deep charcoal, bright red CTAs, and Public Sans typography.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Database**: Prisma ORM + SQLite
- **Animations**: Framer Motion
- **AI**: Z.AI SDK (LLM-powered Marvin bot receptionist)
- **Testing**: Playwright (37 E2E tests)
- **Icons**: Lucide React

## Features

### Public Website (`/`)
- **Hero** with parallax AI-generated background + word-by-word headline reveal
- **Services** grid (6 services, DB-driven, animated)
- **Projects** showcase with hover effects + image reveals
- **About** — Joe & Claudia's story with real company history
- **Why Choose Us** — differentiators on charcoal background
- **Stats** with count-up animations
- **Testimonials** — video-first layout with featured card + modal video player
- **Instagram feed** — real @thehandymangroup posts via official embeds
- **FAQ** — animated accordion
- **Contact form** — submits to DB with validation
- **Marvin AI bot** — floating chat widget powered by Z.AI LLM, introduces itself as "Marvin, Joe's AI bot assistant"
- **WhatsApp widget** — floating button with pulse animation
- **Scroll progress bar** + extensive Framer Motion animations throughout

### Admin Portal (`/admin`)
- **Login**: `Username123!` / `Password123!` (httpOnly cookie auth)
- **Dashboard** with analytics: conversion rate, pipeline value, quotes by service (bar chart), quotes by status (pie chart)
- **CRUD** for Services, Projects, Testimonials (with video upload), FAQs
- **Media Library** — drag-and-drop image + video upload, picker integrated into forms
- **Site Settings** — edit hero text, contact info, hours, socials (reflects on site within 60s)
- **Quote Requests** — 7-stage pipeline (new → contacted → quoted → accepted → scheduled → completed → declined) with internal notes + quote amounts
- **Activity Log** — audit trail of all admin actions

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Z.AI API key (for the Marvin bot — set via the platform, not in code)

### Installation

```bash
# Install dependencies
bun install

# Copy env file and configure
cp .env.example .env

# Push database schema + seed with real company content
bun run db:push
bun run src/lib/seed.ts

# Start dev server
bun run dev
```

Visit `http://localhost:3000` for the public site, or `http://localhost:3000/admin/login` for the admin portal.

### Admin Credentials
- **Username**: `Username123!`
- **Password**: `Password123!`

> ⚠️ Change these in `src/lib/auth.ts` before deploying to production.

## Project Structure

```
prisma/
  schema.prisma          # QuoteRequest, Service, Project, Testimonial, Faq, Media, Setting, ActivityLog, AdminSession
src/
  app/
    page.tsx             # Public homepage (server component, DB-driven)
    layout.tsx           # Root layout with Public Sans font
    admin/               # Admin portal (protected route group)
    api/                 # REST API routes (quote, chat, auth, admin CRUD)
  components/
    site/                # Public site components (hero, services, testimonials, etc.)
    admin/               # Admin components (forms, tables, media picker)
    ui/                  # shadcn/ui components
  lib/
    db.ts                # Prisma client
    auth.ts              # Cookie-based auth with HMAC tokens
    content.ts           # DB content fetchers
    settings.ts          # Key-value site settings
    activity.ts          # Activity logging
    seed.ts              # Database seeder
tests/                   # Playwright E2E tests (homepage, admin, mobile)
```

## Testing

```bash
# Run all 37 E2E tests
npx playwright test

# Run specific suite
npx playwright test tests/homepage.spec.ts
npx playwright test tests/admin.spec.ts
npx playwright test tests/mobile.spec.ts
```

## Design System

Based on the Drill template aesthetic:
- **Colors**: Charcoal `#121117`, Red `#D2151E`, Off-white `#F3F4F6`, WhatsApp Green `#25D366`
- **Typography**: Public Sans (400–700)
- **Corners**: 0px border radius everywhere (sharp, technical aesthetic)
- **Spacing**: Generous whitespace, 52–60px section padding
- **Depth**: No shadows — flat color-based differentiation

## License

Proprietary — The Handyman & Carpentry Group © 2024
