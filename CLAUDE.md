# Nanaimo Courier Website — CLAUDE.md Operating Manual

## What This Project Is

This is a **rank-and-rent lead-generation site** for courier and same-day delivery services in Nanaimo, BC. The site is built as a **renter-swappable template**: a single codebase is deployed under different business names, phone numbers, and emails via environment variables. A local courier operator rents the site, supplies their contact details, and receives lead form submissions and phone clicks.

**CRITICAL:** This is not a bug—`{{BUSINESS_NAME}}`, `{{PHONE}}`, `{{EMAIL}}` in config are intentional renter-swap placeholders. They are configured via `.env` (dev) or Cloudflare Pages environment variables (production). Never hardcode these values. Every page that displays business details pulls from `config.ts`.

## Stack & Key Commands

**Framework:** Astro (static site generation)  
**Styling:** Tailwind CSS + custom design tokens  
**Hosting:** Cloudflare Pages + Cloudflare Pages Functions  
**Build:** Node.js 18+, npm

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build production (dist/)
npm run preview      # Test production build locally
npm run deploy       # Deploy to Cloudflare Pages (uses wrangler)
```

**Icons & Assets:**
```bash
node scripts/generate-icons.js    # Regenerate favicon set from favicon.svg
node scripts/check-links.js       # Audit built dist/ for broken internal links
```

## File & Architecture Map

### Configuration & Entry Points
- **`src/config.ts`** — Renter-swappable config (business name, phone, email, hours, service area). Environment variables override defaults. **This is the single source of truth for all business details.**
- **`.env.example`** — Template for local development; copy to `.env` and update with business details
- **`wrangler.toml`** — Cloudflare Pages worker config; includes env var definitions

### Layouts & Components
- **`src/layouts/BaseLayout.astro`** — Master layout: meta tags, OG/Twitter Cards, GA4, favicon, header, footer, mobile phone CTA
- **`src/components/Header.astro`** — Sticky nav with phone CTA + mobile menu
- **`src/components/Footer.astro`** — Footer with links, legal pages, "Website by Think X Design Media" credit
- **`src/components/MobilePhoneCTA.astro`** — Sticky click-to-call bar (mobile only)
- **`src/components/QuoteForm.astro`** — Quote request form (Turnstile + honeypot + Resend email)
- **`src/components/ContactForm.astro`** (in `/contact` page) — Contact form (same structure)
- **`src/components/B2BCTA.astro`** — B2B account setup call-to-action block
- **`src/components/PhoneCTA.astro`** — Reusable phone link component
- **`src/components/SchemaMarkup.astro`** — JSON-LD schema generator (LocalBusiness, Service, FAQPage, BreadcrumbList)

### Pages
- **`src/pages/index.astro`** — Homepage: hero, services, B2B focus, quote form, value props
- **`src/pages/services/`** — 6 service pages (same-day, rush, medical, legal, scheduled, freight)
- **`src/pages/routes/`** — 4 route pages (Victoria, Comox, Parksville, Port Alberni) with transit times & cutoffs
- **`src/pages/pricing.astro`** — Transparent rate card + calculator
- **`src/pages/industries.astro`** — B2B targeting: law, medical, auto, print, manufacturing
- **`src/pages/faq.astro`** — 18 collapsible FAQ questions
- **`src/pages/blog.astro`** — Blog index + 4 seed articles
- **`src/pages/about.astro`** — Company info
- **`src/pages/contact.astro`** — Contact form + contact info
- **`src/pages/privacy.astro`** — PIPEDA/BC PIPA compliant privacy policy
- **`src/pages/terms.astro`** — Terms of Service (lead-gen specific)
- **`src/pages/sitemap.xml.ts`** — Dynamic XML sitemap (auto-generated from pages)

### Styling
- **`src/styles/global.css`** — Tailwind directives + custom utility classes (.cta-button, .form-input, .card, .section-container)
- **`tailwind.config.cjs`** — Brand colors (blue #1e40af, red accent #dc2626, dark #0f172a), typography

### API & Serverless
- **`functions/api/quote.ts`** — Quote form endpoint: honeypot, Turnstile verification, Resend email, KV logging
- **`functions/api/contact.ts`** — Contact form endpoint: same security + logging
- **`public/_headers`** — Security headers (HSTS, CSP, X-Frame-Options, etc.) for Cloudflare Pages

### Static Assets
- **`public/favicon.svg`** — Wordmark SVG (courier box + motion lines, blue + red)
- **`public/favicon.ico`**, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `android-chrome-*.png` — Generated icon set
- **`public/site.webmanifest`** — PWA manifest
- **`public/og-default.svg`**, **`og-default.png`** — Branded Open Graph image (1200×630)
- **`public/robots.txt`** — SEO crawler directive

### Documentation
- **`README.md`** — Project overview, stack, setup, customization guide
- **`DEPLOYMENT-GUIDE.md`** — Step-by-step Cloudflare Pages + custom domain setup
- **`LAUNCH-CHECKLIST.md`** — 90+ pre/post-launch SEO, citations, review, maintenance tasks
- **`OWNER-ACTIONS.md`** — (You are reading it!) Exact DNS records, env vars, and dashboard steps for the renter

## SEO & Content Conventions (PRESERVE THESE)

### One Keyword Per Page
Every page has ONE primary keyword in:
1. **Title tag** (50–60 characters, keyword first)
2. **H1** (unique, keyword-forward)
3. **First 100 words** (keyword in 1st 1–2 sentences)
4. **URL slug** (if applicable)

**Examples:**
- Homepage: `courier nanaimo`
- Same-day service: `same day delivery nanaimo`
- Victoria route: `nanaimo to victoria courier`
- Pricing: `courier rates nanaimo`

Use keywords naturally—no keyword stuffing.

### Meta Tags & Schema
- **Every page:** Unique meta description (150–160 chars, ends with CTA like "Call 250-555-1234")
- **Homepage:** LocalBusiness schema + FAQPage schema
- **Service pages:** Service schema + breadcrumb schema
- **Blog:** Article schema
- **All pages:** Canonical URL, OG tags, Twitter Card tags

### Internal Linking Web
Service pages → Route pages → Industries page → Blog.  
Homepage links to top 6 services.  
Footer links to all major sections.  
Blog posts include CTA linking to relevant service page.

**Never mass-generate** location pages (e.g., do NOT create 50 "Courier in [City]" pages). The 4 route pages (Victoria, Comox, Parksville, Port Alberni) are manually authored with real transit times and route-specific details. Adding more requires genuine substance.

## Copy Voice Rules

**Fast, direct, operational.** Written like a dispatcher who knows the roads.

- Concrete details: ferry schedules, courthouse procedures, Malahat considerations, cutoff times
- Real examples and scenarios
- No corporate fluff ("we're passionate about excellence")
- No AI-sounding phrasing ("streamlined solutions")
- Action-oriented: "Call now," "Set up account," "Get quote"
- B2B focus: emphasis on volume rates, reliability, uptime

## Hard Invariants (Never Remove or Bypass)

1. **Renter-swappable config:** All business details in `src/config.ts` via env vars. Never hardcode phone/email/name.
2. **Canonical URLs:** Every page must have `rel="canonical"` pointing to self. Never remove or make relative.
3. **No hardcoded URLs:** All links derive from `SITE_URL` config or relative paths. Never hardcode `https://nanaimocourier.com`.
4. **No lorem/TODO in built output:** Proofread before every deploy. Test: `grep -r "TODO\|lorem\|XXXXXXXXXX" dist/`
5. **Think X Design Media footer credit:** Must appear on every page footer with link to https://thinkxdesign.com. It's a legal/attribution requirement; never remove.
6. **Lighthouse ≥95:** All categories (performance, accessibility, best practices, SEO). If a change drops score below 95, revert.
7. **No mass doorway pages:** Never auto-generate location pages. Each page must have unique, substantial content.
8. **Security headers:** `_headers` file in `public/` must always be present and deployed to Cloudflare. Covers HSTS, CSP, X-Frame-Options, etc.

## Forms: Implementation Details

### Quote Form
**Location:** Appears on homepage and all service pages via `<QuoteForm />` component.  
**Endpoint:** `/api/quote` (POST)  
**Fields:** pickup_location, dropoff_location, package_size, needed_by, email, phone, notes, website_check (honeypot), cf-turnstile-response  
**Security:** Cloudflare Turnstile (bot check) + honeypot field + server-side validation  
**Submission:** Resend email API → `NOTIFY_EMAIL` env var + KV backup logging

### Contact Form  
**Location:** `/contact` page  
**Endpoint:** `/api/contact` (POST)  
**Fields:** name, email, phone, inquiry, message, website_check, cf-turnstile-response  
**Submission:** Same as quote form

**Environment Variables Required:**
- `RESEND_API_KEY` — Resend email service API key
- `NOTIFY_EMAIL` — Email address to send form submissions to
- `TURNSTILE_SITE_KEY` — Cloudflare Turnstile public key
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key
- `GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID

## Staging & Feature Flags

None. This is a static site—no staging/production logic branches. Test locally with `npm run preview`, then deploy to Cloudflare Pages.

## Deployment Checklist

Before deploying to production:
1. ✅ Build locally: `npm run build`
2. ✅ No broken links: `node scripts/check-links.js`
3. ✅ No TODO/lorem: `grep -r "TODO\|lorem" dist/`
4. ✅ Test forms locally with preview
5. ✅ Lighthouse score 95+ (use PageSpeed Insights post-deploy)
6. ✅ All pages have unique title/meta/H1
7. ✅ Privacy & Terms pages populated with real legal text
8. ✅ Favicon & OG image present
9. ✅ Git commits are logical and meaningful

## Common Customization Tasks

### Change Business Details
Edit `.env` or Cloudflare Pages environment variables:
```
BUSINESS_NAME="Your Courier"
PHONE="(250) 555-1234"
EMAIL="dispatch@yourcourier.com"
```
Redeploy. All pages auto-update.

### Add a New Service Page
1. Copy `src/pages/services/same-day-delivery.astro`
2. Update title, H1, description, content
3. Add primary keyword to title/H1/first 100 words
4. Link from homepage and footer
5. Add to `src/pages/sitemap.xml.ts`

### Update Pricing
Edit `src/pages/pricing.astro`. All rates and examples in one file for easy updates.

### Modify Brand Colors
Edit `tailwind.config.cjs`:
```javascript
colors: {
  brand: {
    dark: '#0f172a',      // navbar background
    blue: '#1e40af',      // primary CTA text
    accent: '#dc2626',    // buttons & highlights
  },
}
```
Rebuild and deploy.

### Update Footer Credit
**DO NOT REMOVE THE THINK X DESIGN MEDIA CREDIT.** If you must change text, keep the link and spirit intact.

## What NOT to Change

- **Canonical URL logic** — Always points to self, never remove
- **Renter-swappable config structure** — It's the core value proposition
- **Schema markup on pages** — Critical for SEO and local pack visibility
- **Mobile phone CTA** — Sticky footer on mobile is primary conversion driver
- **Security headers in `_headers`** — Required by Cloudflare Pages for deployment
- **Think X Design Media footer credit** — Attribution requirement; don't remove
- **The 4 route pages** — They're manually authored with real route intelligence, not templates

## Performance & SEO Notes

- **LCP target:** < 2.5s (static HTML + Tailwind, achievable without images)
- **CLS target:** < 0.1 (no layout shifts; Astro + Tailwind CSS ensures this)
- **No JavaScript on page load** — Forms use vanilla JS that loads after HTML
- **Sitemap auto-generated** — `sitemap.xml.ts` picks up all pages; no manual updates needed
- **Robots.txt:** Allows all crawlers to all content; disallows `/api/`

## Running This Locally

```bash
# Dev
npm run dev
# → http://localhost:3000

# Staging (test production build)
npm run build
npm run preview
# → http://localhost:3000 (production-optimized)

# Production deploy
# Push to GitHub → Cloudflare Pages auto-builds and deploys
```

## Maintenance

- **Monthly:** Solicit 5–10 customer reviews for Google Business Profile
- **Quarterly:** Publish one blog post; refresh old content with current year/data
- **Quarterly:** Check Google Search Console for impression/click trends
- **Annually:** Audit core pages for accuracy (hours, phone, service area)
- **Annually:** Rebuild icon set if branding changes

---

**Last Updated:** 2026-07-15  
**Maintainer:** Claude Code + Renter  
**Next Review:** 2026-10-15
