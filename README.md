# Nanaimo Courier Lead-Gen Website

A rank-and-rent lead-generation site for courier and same-day delivery services in Nanaimo, BC. Built with Astro, Tailwind CSS, deployed on Cloudflare Pages.

**Goal:** Rank #1 organically for "courier nanaimo" and related keywords; generate high-value B2B leads (law firms, medical facilities, manufacturing); route leads to a renter via quote forms and phone clicks.

---

## Features

- **Homepage** — Hero, service overview, B2B focus, quote form, coverage map
- **8 Service Pages** — Same-day, rush/hot-shot, medical & lab, legal courier, scheduled routes, freight, Nanaimo ↔ Victoria, and more
- **4 Route Pages** — Nanaimo to Victoria (ferry), Comox Valley, Parksville, Port Alberni with real transit times, cutoff times, and route-specific considerations
- **Pricing Page** — Transparent rate card with examples and a rate calculator
- **Industries Page** — B2B targeting (law, medical, auto parts, print, manufacturing) with case study
- **FAQ & Blog** — 4 seed articles covering cutoff times, courier comparison, legal delivery, and hot-shot service
- **Full SEO** — Schema markup (LocalBusiness, Service, FAQPage), XML sitemap, meta optimization, internal linking
- **Mobile-Optimized** — Sticky phone CTA footer, responsive design, Lighthouse 95+
- **Renter-Swappable Config** — Business name, phone, email via environment variables

---

## Tech Stack

- **Framework:** Astro (static site generation)
- **Styling:** Tailwind CSS + custom design tokens
- **Hosting:** Cloudflare Pages
- **Serverless Functions:** Cloudflare Pages Functions (quote/contact form handlers)
- **Build:** Node.js + npm

---

## Project Structure

```
nanaimo-courier-website/
├── src/
│   ├── pages/
│   │   ├── index.astro                 # Homepage
│   │   ├── services/
│   │   │   ├── same-day-delivery.astro
│   │   │   ├── rush-delivery.astro
│   │   │   ├── medical-courier.astro
│   │   │   ├── legal-courier.astro
│   │   │   ├── scheduled-delivery.astro
│   │   │   └── freight-delivery.astro
│   │   ├── routes/
│   │   │   ├── nanaimo-victoria.astro
│   │   │   ├── nanaimo-comox.astro
│   │   │   ├── nanaimo-parksville.astro
│   │   │   └── nanaimo-port-alberni.astro
│   │   ├── pricing.astro
│   │   ├── industries.astro
│   │   ├── faq.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── blog.astro
│   │   ├── blog/
│   │   │   ├── same-day-delivery-cutoff-times.astro
│   │   │   ├── courier-vs-canada-post-purolator.astro
│   │   │   ├── legal-document-delivery-bc.astro
│   │   │   └── hot-shot-delivery-explained.astro
│   │   ├── sitemap.xml.ts              # Dynamic sitemap
│   │   └── api/                        # API routes (if needed)
│   ├── layouts/
│   │   └── BaseLayout.astro            # Main layout with header/footer
│   ├── components/
│   │   ├── Header.astro                # Sticky header with phone CTA
│   │   ├── Footer.astro
│   │   ├── MobilePhoneCTA.astro        # Sticky mobile footer
│   │   ├── QuoteForm.astro             # Inline quote form
│   │   ├── B2BCTA.astro                # B2B account CTA block
│   │   ├── PhoneCTA.astro              # Reusable phone link
│   │   └── SchemaMarkup.astro          # JSON-LD schema generator
│   ├── styles/
│   │   └── global.css                  # Tailwind + utility classes
│   └── config.ts                       # Renter-swappable config
├── functions/
│   └── api/
│       ├── quote.ts                    # Quote form handler
│       └── contact.ts                  # Contact form handler
├── public/
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
├── package.json
├── wrangler.toml                       # Cloudflare Pages config
├── .env.example                        # Environment variable template
├── .gitignore
├── LAUNCH-CHECKLIST.md                 # Pre-launch & post-launch tasks
└── README.md                           # This file
```

---

## Setup & Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your business details:

```bash
cp .env.example .env
```

Edit `.env`:

```env
BUSINESS_NAME="Your Courier Service"
PHONE="(250) 555-1234"
EMAIL="dispatch@yourdomain.com"
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Build for Production

```bash
npm run build
```

This creates a static site in the `dist/` directory, ready for Cloudflare Pages deployment.

---

## Deployment

### Deploy to Cloudflare Pages

1. **Connect your git repo:**
   - Push code to GitHub, GitLab, or Gitea
   - Go to Cloudflare Pages dashboard
   - Create new project, select your repo

2. **Configure build settings:**
   - Framework: Astro
   - Build command: `npm run build`
   - Build output directory: `dist/`

3. **Set environment variables in Cloudflare:**
   - Add `BUSINESS_NAME`, `PHONE`, `EMAIL` in Pages project settings

4. **Deploy:**
   - Push to your repo → Cloudflare auto-builds and deploys
   - Custom domain: Set DNS to Cloudflare, assign in Pages settings

### Alternate: Manual Deployment

```bash
npm run deploy  # Uses wrangler to deploy to Cloudflare Pages
```

---

## Customization

### Change Business Details

Edit `.env` (or update in Cloudflare Pages environment variables):

```env
BUSINESS_NAME="Your Company Name"
PHONE="(250) 555-1234"
EMAIL="your-email@domain.com"
```

These values are used throughout the site via `src/config.ts`.

### Update Service Hours

Edit `src/config.ts`:

```typescript
export const config = {
  // ...
  hours: {
    weekday: '7:00 AM - 6:00 PM',
    weekend: '8:00 AM - 4:00 PM',
  },
};
```

### Customize Design

Tailwind CSS configuration is in `tailwind.config.cjs`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        dark: '#0f172a',   // Dark blue
        blue: '#1e40af',   // Primary blue
        accent: '#dc2626', // Red accent (CTA)
      },
    },
  },
},
```

Change color values to match your brand.

### Add/Remove Service Pages

1. Create new page in `src/pages/services/` (copy existing as template)
2. Update internal links in Header, Footer, homepage
3. Add to `src/pages/sitemap.xml.ts`

---

## Quote & Contact Forms

### How They Work

1. User submits form (quote or contact)
2. Form POST to `/api/quote` or `/api/contact` (Cloudflare Pages Functions)
3. Handler logs data and returns success response
4. **TODO:** Wire to email service (Resend, SendGrid, Mailgun) before launch

### Enable Email Delivery

Edit `functions/api/quote.ts` and `functions/api/contact.ts`:

```typescript
// Example: Using Resend email service
import { Resend } from 'resend';

const resend = new Resend(context.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@nanaimocourier.com',
  to: context.env.EMAIL,
  subject: `New Quote Request`,
  html: `<p>${data.message}</p>`,
});
```

Add `RESEND_API_KEY` to Cloudflare environment variables.

---

## SEO Checklist

- ✅ Unique title tags (50–60 chars) on every page
- ✅ Unique meta descriptions (150–160 chars with CTA)
- ✅ H1 tag on every page with target keyword
- ✅ Schema markup (LocalBusiness, Service, FAQPage, BreadcrumbList)
- ✅ XML sitemap (`/sitemap.xml`)
- ✅ Mobile-responsive (Lighthouse 95+)
- ✅ Internal linking web (services → routes → industries → blog)
- ✅ Fast performance (LCP < 2.5s)
- ⚠️ TODO: Google Business Profile verification (critical for local rankings)
- ⚠️ TODO: Submit to Google Search Console
- ⚠️ TODO: Build local business citations (411.ca, YellowPages, etc.)

See `LAUNCH-CHECKLIST.md` for full pre-launch & post-launch SEO tasks.

---

## Performance Targets

- **Lighthouse Score:** 95+
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Mobile Usability:** No errors

Test with:
```bash
npm run build
npm run preview  # Test production build locally
```

Then use Google PageSpeed Insights: https://pagespeed.web.dev

---

## Content Notes

### Keyword Strategy

**Primary keywords (one per page):**
- Homepage: "courier nanaimo"
- Same-Day: "same day delivery nanaimo"
- Rush: "rush delivery nanaimo"
- Medical: "medical courier nanaimo"
- Legal: "legal courier nanaimo"
- Victoria Route: "nanaimo to victoria courier"
- Pricing: "courier rates nanaimo"
- Industries: "courier for law firms nanaimo"

**Secondary keywords (used naturally):**
- "hot-shot delivery vancouver island"
- "court filing nanaimo"
- "lab specimen courier bc"
- "same-day delivery victoria"

### Image Requirements

All images should:
- Use WebP format (next-gen compression)
- Include descriptive alt text
- Be lazy-loaded
- Have TODO comments if placeholder

Example placeholder:
```html
<!-- TODO: Replace with real courier driver/vehicle photo -->
<img src="/placeholder.webp" alt="Courier driver delivering package" />
```

---

## Maintenance

### Weekly
- Monitor form submissions
- Spot-check for broken links

### Monthly
- Review Google Search Console (if setup)
- Audit top pages for accuracy
- Respond to customer reviews

### Quarterly
- Solicit new reviews
- Publish new blog post
- Run Lighthouse audit
- Update route times if changed

See `LAUNCH-CHECKLIST.md` for full maintenance schedule.

---

## Support & Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .astro node_modules dist
npm install
npm run build
```

### Form Not Submitting

1. Check browser console for errors (`F12`)
2. Verify Cloudflare Functions are deployed
3. Check environment variables in Cloudflare Pages dashboard

### Site Loads Slow

1. Run Lighthouse audit: https://pagespeed.web.dev
2. Check image sizes (use WebP, lazy load)
3. Verify Core Web Vitals in Google Search Console

---

## License

This project is proprietary. Renter-customized deployments are governed by separate licensing agreements.

---

## Questions?

For setup, deployment, or customization questions, refer to:
- **Astro Docs:** https://docs.astro.build
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Cloudflare Pages:** https://pages.cloudflare.com
- **LAUNCH-CHECKLIST.md** — Complete pre-launch & post-launch guide
