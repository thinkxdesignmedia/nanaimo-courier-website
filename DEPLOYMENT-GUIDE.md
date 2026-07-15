# Deployment Guide: Nanaimo Courier Website

Quick-start guide to get the site live on Cloudflare Pages.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- GitHub/GitLab account
- Cloudflare account
- Domain name (nanaimocourier.com or renter's domain)

---

## Step 1: Local Setup & Testing

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env

# Edit .env with your details
# BUSINESS_NAME=...
# PHONE=...
# EMAIL=...

# Start dev server (test at http://localhost:3000)
npm run dev

# Build production (creates dist/ folder)
npm run build

# Test production build locally
npm run preview
```

All pages should load, forms should work (though email not yet wired).

---

## Step 2: Push to Git

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Nanaimo Courier lead-gen site"

# Add remote (GitHub example)
git remote add origin https://github.com/your-username/nanaimo-courier-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Cloudflare Pages

### Option A: Via Cloudflare Dashboard (Easiest)

1. **Go to Cloudflare Pages** → https://pages.cloudflare.com
2. **Sign in** to your Cloudflare account
3. **"Create a project"** → Select your Git provider (GitHub, GitLab, etc.)
4. **Authorize & select repo** → `nanaimo-courier-website`
5. **Configure build settings:**
   - Framework: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist/`
6. **Set environment variables** (in Pages project settings → Environment variables):
   ```
   BUSINESS_NAME = "Nanaimo Courier"
   PHONE = "(250) 753-0000"
   EMAIL = "dispatch@nanaimocourier.com"
   ```
7. **Deploy** → Cloudflare auto-deploys on every git push

### Option B: Via CLI (If Preferred)

```bash
# Install wrangler CLI
npm install -g @cloudflare/wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

---

## Step 4: Configure Custom Domain

1. **In Cloudflare Pages project settings:**
   - Go to "Custom domains"
   - Enter domain (e.g., `nanaimocourier.com`)
   
2. **Configure DNS:**
   - If domain already uses Cloudflare: Add CNAME record
     - Name: `nanaimocourier` (or subdomain)
     - Target: `your-project.pages.dev`
   - If domain uses another registrar: Point nameservers to Cloudflare
     - Use Cloudflare's nameservers from your account

3. **Wait for DNS propagation** (5 min–48 hours)

4. **Test:** Visit https://nanaimocourier.com → Should load

---

## Step 5: Enable SSL/TLS

Cloudflare auto-enables free SSL. Confirm:

1. **Cloudflare Pages project** → "Settings" → "HTTPS"
2. Should show "Universal SSL enabled" (free tier)
3. Test: https://nanaimocourier.com → Should be secure (lock icon)

---

## Step 6: Wire Email Forms (Before Launch)

Quote and contact forms currently log submissions but don't email. To enable:

### Using Resend (Recommended for Email)

1. **Sign up at Resend:** https://resend.com (free tier available)
2. **Get API key** from Resend dashboard
3. **Add to Cloudflare Pages environment variables:**
   ```
   RESEND_API_KEY = "re_xxxxxxxxxxxxxxxx"
   ```
4. **Update `functions/api/quote.ts`:**
   ```typescript
   import { Resend } from 'resend';

   export async function onRequest(context) {
     const resend = new Resend(context.env.RESEND_API_KEY);
     const data = await context.request.json();

     await resend.emails.send({
       from: 'noreply@nanaimocourier.com',
       to: context.env.EMAIL,
       subject: 'New Quote Request',
       html: `<p>Pickup: ${data.pickup_location}</p>
              <p>Dropoff: ${data.dropoff_location}</p>
              <p>Contact: ${data.email} / ${data.phone}</p>`,
     });

     return new Response(JSON.stringify({ success: true }), {
       status: 200,
       headers: { 'Content-Type': 'application/json' },
     });
   }
   ```
5. **Commit and push** → Cloudflare redeploys automatically

---

## Step 7: Set Up Google Search Console & Business Profile

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://nanaimocourier.com`
3. Verify via DNS TXT record (Cloudflare → DNS → Add record)
4. Wait for verification
5. Submit sitemap: `https://nanaimocourier.com/sitemap.xml`

### Google Business Profile

1. Go to https://www.google.com/business
2. Create or claim profile for Nanaimo Courier
3. **Verify address** (critical for map pack visibility)
4. Add phone, hours, service area, photos
5. Link to website: `https://nanaimocourier.com`

---

## Step 8: Test Everything

- [ ] Homepage loads at custom domain
- [ ] Mobile layout responsive (check on phone)
- [ ] Quote form submits (check email inbox)
- [ ] Contact form submits (check email inbox)
- [ ] Phone link clickable (tel: protocol)
- [ ] All internal links work
- [ ] Google Search Console receives sitemap
- [ ] No broken images (check browser console)
- [ ] Lighthouse score 95+ (run PageSpeed Insights)

---

## Ongoing: What to Do Next

1. **Solicit reviews** — Email first 10 customers, ask for Google reviews
2. **Monitor analytics** — Link Google Analytics account (or set up)
3. **Publish new content** — Blog post monthly to keep site fresh
4. **Respond to inquiries** — Quote/contact form emails should go to dispatch
5. **Update business info** — If hours, phone, or service area changes, update site

See **LAUNCH-CHECKLIST.md** for complete pre-launch & post-launch task list.

---

## Troubleshooting

### Build Fails in Cloudflare

Check Cloudflare Pages build logs:

1. Go to project → Deployments
2. Click latest deploy → View build log
3. Look for errors (usually missing dependencies or env vars)
4. Fix locally, commit, push → Redeploy

### Site Shows Old Content After Pushing

Cloudflare may cache old version:

1. In Pages project → "Deployments" → click latest
2. Manually "Retry deployment"
3. Or clear cache in Cloudflare dashboard (Caching tab)

### Custom Domain Not Working

1. Confirm DNS is pointing to Cloudflare Pages
2. In Cloudflare, check "Custom domains" → status should be "Active"
3. Wait 24h for full DNS propagation
4. Test with: `nslookup nanaimocourier.com`

### Forms Not Sending Email

1. Check Resend API key is valid (test at https://resend.com)
2. Confirm env var set in Cloudflare Pages
3. Check "From" email is verified in Resend dashboard
4. Look at function logs in Cloudflare (Workers → tail logs)

---

## Support

- **Astro Issues:** https://github.com/withastro/astro/issues
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Resend Email:** https://resend.com/docs

---

**Deployment Status:** [ ] Complete — Site is live on custom domain  
**Date Deployed:** _______________  
**Domain:** _______________
