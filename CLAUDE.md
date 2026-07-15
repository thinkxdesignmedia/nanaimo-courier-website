# Nanaimo Courier Website

## Stack
- **Framework:** Astro (static site generation)
- **Styling:** Tailwind CSS + custom design tokens
- **Hosting:** Cloudflare Pages + Cloudflare Pages Functions
- **Build:** Node.js 18+, npm

## Key Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build production (dist/)
npm run preview      # Test production build locally
npm run deploy       # Deploy to Cloudflare Pages
```

## Project Structure
- `src/pages/` — Routes (homepage, services, routes, pricing, industries, blog, API)
- `src/components/` — Reusable UI (Header, Footer, QuoteForm, B2BCTA, SchemaMarkup)
- `src/layouts/` — Base layout (header, footer, SEO)
- `src/config.ts` — Renter-swappable config (BUSINESS_NAME, PHONE, EMAIL)
- `functions/api/` — Cloudflare Pages Functions (form handlers)
- `public/` — Static files (robots.txt)

## Conventions
- One primary keyword per page (title, H1, first 100 words)
- Schema markup on every content page (LocalBusiness, Service, FAQPage)
- 800–1,200 word service/route pages (real substance, not thin)
- Components accept props for reuse; no magic strings
- Placeholder images flagged with TODO comments
- Mobile-first responsive design; sticky phone CTA on mobile

## Configuration
- `.env` — Business name, phone, email (copy from `.env.example`)
- `wrangler.toml` — Cloudflare Pages config
- Environment variables control renter details (zero code changes needed)

## Pre-Launch
See `LAUNCH-CHECKLIST.md` for 90+ tasks: deployment, Google Business Profile, local citations, review seeding, ongoing maintenance.

## Deployment
See `DEPLOYMENT-GUIDE.md` for step-by-step Cloudflare Pages setup.
