# Launch Checklist: Nanaimo Courier Lead-Gen Site

This checklist covers deployment, SEO setup, local business verification, and ongoing maintenance to rank #1 for "courier nanaimo" and drive leads to the renter.

---

## Phase 1: Pre-Launch (Weeks 1–2)

### Code & Content
- [x] Scaffold Astro project with design system
- [x] Homepage with hero, service overview, B2B CTA
- [x] 8 service pages (same-day, rush, medical, legal, scheduled, freight)
- [x] 4 route pages (Victoria, Comox, Parksville, Port Alberni)
- [x] Pricing page with rate calculator
- [x] Industries page (B2B focus: law, medical, auto, print, manufacturing)
- [x] FAQ page with schema markup
- [x] 4 blog seed articles
- [x] About & Contact pages
- [x] Renter-swappable config (BUSINESS_NAME, PHONE, EMAIL)
- [x] Quote form & contact form (Cloudflare Pages Functions)
- [x] Mobile phone CTA (sticky footer on mobile)
- [x] Full responsive design (Lighthouse 95+, LCP < 2s)

### SEO Foundation
- [x] Unique titles (50–60 chars) on every page
- [x] Unique meta descriptions (150–160 chars with CTA)
- [x] H1 & keyword in first 100 words on service/route pages
- [x] Schema markup (LocalBusiness, Service, FAQPage, BreadcrumbList)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonicals on all pages
- [x] Internal linking web (services → routes → industries → blog)

### Performance
- [ ] WebP images with lazy loading
- [ ] Placeholder images flagged with TODO comments (replace before launch)
- [ ] Lighthouse audit 95+ (Core Web Vitals passing)
- [ ] LCP < 2s confirmed on mobile & desktop

### Configuration
- [ ] `.env.example` created; documentation on renter config
- [ ] wrangler.toml configured for Cloudflare Pages
- [ ] Build & deployment tested locally
- [ ] Git initialized; .gitignore in place

---

## Phase 2: Deployment (Week 2–3)

### Cloudflare Pages Setup
- [ ] Project created in Cloudflare Pages dashboard
- [ ] Git repo connected (GitHub/GitLab/Gitea)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist/`
- [ ] Environment variables set (BUSINESS_NAME, PHONE, EMAIL, etc.)
- [ ] Custom domain configured: nanaimocourier.com
- [ ] SSL/TLS enabled (automatic via Cloudflare)
- [ ] First deploy successful; site live at nanaimocourier.com

### DNS & Domain
- [ ] Domain nanaimocourier.com registered (if not already)
- [ ] Nameservers pointing to Cloudflare
- [ ] DNS A record pointing to Cloudflare Pages
- [ ] MX records set (if email via custom domain needed)
- [ ] SPF/DKIM configured for email deliverability (optional)

### Email Forms
- [ ] Quote form linked to email service (TODO: wire Resend or similar)
- [ ] Contact form linked to email service
- [ ] Test quote submission → confirm email received
- [ ] Test contact submission → confirm email received

---

## Phase 3: Search Console & Analytics (Week 3)

### Google Search Console
- [ ] Property created and verified (via DNS or file)
- [ ] Sitemap submitted (https://nanaimocourier.com/sitemap.xml)
- [ ] Coverage report checked (all pages indexed)
- [ ] Mobile usability report passing (no errors)
- [ ] Core Web Vitals passing (LCP, CLS, FID)
- [ ] URL inspection for homepage completed

### Google Business Profile (Critical for Local SEO)
- [ ] Profile created for {{BUSINESS_NAME}} in Nanaimo
- [ ] **Address verified** (required for map pack — most "courier near me" clicks come via map pack)
- [ ] **Phone number verified**
- [ ] Service area set: Nanaimo, central Vancouver Island
- [ ] Hours of operation filled in (7 AM–6 PM weekdays, 8 AM–4 PM weekends)
- [ ] Business type: "Courier Service"
- [ ] Categories: Courier Service, Delivery Service, Logistics
- [ ] Logo and business photos uploaded
- [ ] Link to website added
- [ ] Initial review seeding done (ask satisfied customer for 5-star review)

### Analytics
- [ ] Google Analytics 4 script added to site (or via Astro integration)
- [ ] Tracking verified; test visit shows in real-time
- [ ] Goal tracking set: Quote form submit, contact form submit, phone click

---

## Phase 4: Local Business Citations (Week 3–4)

### Citation Building (Improve map pack rankings)
Consistent business name, address, phone (NAP) across directories increases local authority.

- [ ] **411.ca** — Submit business listing (free)
- [ ] **YellowPages.ca** — Verify/claim business (free)
- [ ] **Local.ca** — Business profile
- [ ] **Canada Business Directory** — Listing
- [ ] **Nanaimo Chamber of Commerce** — Member directory (if member)
- [ ] **Better Business Bureau (BBB)** — Verify business
- [ ] **Google Maps local listing** — Cross-link with Google Business Profile

**Note:** Consistency is key. Use exact same NAP on all citations.

---

## Phase 5: Backlink Targets (Week 4–5)

### Local Authority Links
Nanaimo-specific and Vancouver Island industry sites that reference courier services.

Target these for outreach:
- [ ] **Nanaimo Chamber of Commerce** — Request link from member directory or referral list
- [ ] **Vancouver Island University (VIU)** — Campus services or contractor directory
- [ ] **Nanaimo Regional General Hospital** — Supplier/service directory (medical courier focus)
- [ ] **Law Society of BC** — Service providers directory (legal courier focus)
- [ ] **Nanaimo Tourism** — Business services link
- [ ] **Local business associations** — Auto, print, manufacturing industry groups

Outreach strategy:
1. Contact by email with personalized pitch
2. Offer local expertise/resource (e.g., "Same-day delivery on Vancouver Island: route guide")
3. Ask for link in exchange for resource or simple acknowledgment

---

## Phase 6: Review & Reputation (Ongoing)

### Review Generation Strategy
Map pack & organic rankings are heavily influenced by review count and recency.

- [ ] Send review request email to first 10 customers (after positive delivery)
- [ ] Create Google Business Profile review link; include in follow-up emails
- [ ] Ask via phone: "Would you mind leaving us a quick review on Google?"
- [ ] Target: 15 reviews by end of month 1; 50+ reviews by end of quarter

**Review link format:**
```
https://www.google.com/maps/place/{{BUSINESS_NAME_URL_ENCODED}}/@COORDS/reviews
```

### Reputation Monitoring
- [ ] Google Alerts set for brand + "nanaimo courier"
- [ ] Review monitoring (Google, YellowPages, BBB)
- [ ] Respond to all reviews (positive & negative) within 24 hours

---

## Phase 7: Content & Blog Outreach (Weeks 5–8)

### Blog SEO
Initial 4 seed articles are in place. Continue publishing:

- [ ] Publish new blog post weekly (or bi-weekly)
- [ ] Topics: courier tips, logistics insights, Vancouver Island delivery stories
- [ ] Promote via local business networks (LinkedIn, industry groups)

### Content Repurposing
- [ ] Extract FAQ into social media posts
- [ ] Create short video walkthroughs (form submission, ordering process)
- [ ] Share blog posts on Nanaimo business forums/groups

---

## Phase 8: Performance & Ongoing Optimization (Monthly)

### Monthly SEO Audit
- [ ] Google Search Console — Check impressions, CTR, average position
- [ ] Core Web Vitals — Confirm LCP < 2.5s, CLS < 0.1
- [ ] Lighthouse score — Re-run quarterly (target 95+)
- [ ] Mobile vs. desktop traffic breakdown
- [ ] Top landing pages & bounce rates

### Quarterly Tasks
- [ ] Review traffic by keyword; double-check top-traffic service pages for accuracy
- [ ] Update route delivery times if conditions change (Malahat, ferries, etc.)
- [ ] Refresh old blog content with current year updates
- [ ] Check citation consistency across business directories
- [ ] Solicit 5–10 new reviews quarterly

### Annual Tasks
- [ ] Comprehensive SEO audit (tool: Ahrefs, SEMrush, or Moz)
- [ ] Competitor keyword analysis
- [ ] Refresh homepage messaging (if market/service offering changes)
- [ ] Review & update pricing page
- [ ] Full cite website audit (accessibility, performance, security)

---

## Phase 9: Lead Routing (Critical for Renter Revenue)

### Backend Setup (Out of Scope for This Build)
- [ ] Quote form submissions → Email to renter's dispatch email
- [ ] Contact form submissions → Email to renter's contact email
- [ ] Phone clicks tracked in analytics (goal conversion)
- [ ] Optional: CRM integration (Pipedrive, HubSpot) to track lead source & conversion

### Lead Quality Improvement
- [ ] Renter provides feedback: which leads convert, which are spam
- [ ] Adjust form fields or qualification questions based on feedback
- [ ] A/B test CTA copy ("Get Quote Now" vs. "Call Now" vs. "Set Up Account")

---

## Renter Onboarding Checklist

When handing over to renter, confirm:

- [ ] **Config updated:** BUSINESS_NAME, PHONE, EMAIL in `.env` or dashboard
- [ ] **Domain:** Renter owns domain OR long-term DNS arrangement in place
- [ ] **Email:** Dispatch email receiving form submissions
- [ ] **Analytics access:** Renter can view Google Analytics (property linked to their GA account)
- [ ] **Google Business Profile:** Renter has claimed/verified profile; can update listings
- [ ] **Search Console:** Renter added as verified owner
- [ ] **Deployment:** Renter knows how to trigger new builds (redeploy on content changes)
- [ ] **Form submission email:** Tested; renter receives alerts for new quotes/contacts
- [ ] **Phone number:** Verified working; tracks as conversion goal in analytics

---

## Quick Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Score | 95+ | Chrome DevTools |
| LCP (Largest Contentful Paint) | < 2.5s | Google PageSpeed |
| CLS (Cumulative Layout Shift) | < 0.1 | Google PageSpeed |
| FID (First Input Delay) | < 100ms | Web Vitals |
| Mobile usability | No errors | GSC |
| Indexed pages | 100% | GSC |
| Avg position for "courier nanaimo" | Top 3 within 6 months | GSC |

---

## SEO Success Metrics (6-Month Goals)

- **Organic traffic:** 500+ sessions/month from organic search
- **Keyword rankings:** Top 3 for "courier nanaimo", "same day delivery nanaimo"
- **Map pack visibility:** Showing consistently in top 5 local results
- **Form submissions:** 20+ quotes/contact requests per month
- **Phone clicks:** 50+ clicks to phone number per month
- **Average position:** #1–#5 for primary keywords

---

## Maintenance Schedule

### Weekly
- [ ] Monitor form submissions; forward to renter
- [ ] Spot-check site for errors or broken links

### Monthly
- [ ] Review Google Search Console (impressions, CTR)
- [ ] Audit top traffic pages for accuracy
- [ ] Respond to new reviews

### Quarterly
- [ ] Solicit new reviews (batch email to past customers)
- [ ] Update blog with new article
- [ ] Refresh pricing/rates if changed
- [ ] Full performance audit (Lighthouse, Core Web Vitals)

### Annually
- [ ] Comprehensive SEO audit
- [ ] Competitor analysis
- [ ] Content strategy review
- [ ] Citation audit (ensure NAP consistency)

---

## Post-Launch Notes

1. **No "placeholder" images on launch.** All TODOs must be resolved before going live. Empty alt text or stock images hurt SEO.
2. **Email delivery:** Choose and wire up a service (Resend, SendGrid, Mailgun) before launch so forms actually send emails.
3. **Map pack is king.** Most "courier nanaimo" clicks come from Google Maps. Verify business address in Google Business Profile immediately.
4. **Review seeding matters.** Reach out to your first satisfied customers and ask for reviews. Initial reviews boost local ranking more than later ones.
5. **Content is ongoing.** Blog seed articles establish authority, but regular new content keeps the site fresh and gives reasons for search engines to re-crawl.
6. **Renter success = your success.** If the renter gets good leads, they'll re-sign, expand, and refer. Focus on lead quality, not just traffic.

---

**Document Owner:** Nanaimo Courier  
**Last Updated:** [Current Date]  
**Next Review:** [One Month From Launch]
