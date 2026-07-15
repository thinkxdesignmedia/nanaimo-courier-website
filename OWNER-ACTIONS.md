# OWNER-ACTIONS.md — Complete Renter Setup Guide

This document contains **exact, copy-pasteable values and step-by-step instructions** for deploying the Nanaimo Courier lead-gen site to production. These steps require your Cloudflare account, domain, and email service access.

---

## Phase 1: GitHub Repository

**✅ Already completed by developer.** Repository is at:  
```
https://github.com/thinkxdesignmedia/nanaimo-courier-website
```

**Your action:** Clone to your machine or fork to your own GitHub organization.

```bash
git clone https://github.com/thinkxdesignmedia/nanaimo-courier-website.git
cd nanaimo-courier-website
```

---

## Phase 2: Local Setup & Configuration

### Step 2.1: Environment Variables (Local Development)

Copy the environment template:
```bash
cp .env.example .env
```

Edit `.env` with your business details:
```env
BUSINESS_NAME="Your Courier Service Name"
PHONE="(250) 555-1234"
EMAIL="dispatch@yourcourier.com"
```

**Test locally:**
```bash
npm install
npm run dev
```

Visit http://localhost:3000 and verify your business name, phone, and email appear throughout the site.

---

## Phase 3: Cloudflare Pages Deployment

### Step 3.1: Connect GitHub Repo to Cloudflare Pages

1. **Log in to Cloudflare** → https://dash.cloudflare.com
2. **Select your domain** (or add it if not registered with Cloudflare)
3. **Workers & Pages** → **Pages** → **Create application** → **Connect to Git**
4. **Select GitHub account** → Authorize Cloudflare to access your repositories
5. **Select repository:** `nanaimo-courier-website`
6. **Branch:** `master` (or `main` if you renamed it)
7. **Build command:** `npm run build`
8. **Build output directory:** `dist`
9. **Environment variables:** Add the following:
   ```
   BUSINESS_NAME = "Your Courier Service Name"
   PHONE = "(250) 555-1234"
   EMAIL = "dispatch@yourcourier.com"
   RESEND_API_KEY = [see Phase 4 below]
   NOTIFY_EMAIL = "[your dispatcher email]"
   TURNSTILE_SITE_KEY = [see Phase 5 below]
   TURNSTILE_SECRET_KEY = [see Phase 5 below]
   GA_MEASUREMENT_ID = [see Phase 6 below]
   ```
10. **Deploy:** Click "Save and deploy"

**Expected:** Site is live at `your-project.pages.dev` (temporary URL).

### Step 3.2: Add Custom Domain

1. **Cloudflare Pages** → **Your project** → **Settings** → **Custom domains** → **Add custom domain**
2. **Enter domain:** `nanaimocourier.com` (or your domain)
3. **If domain is NOT on Cloudflare yet:**
   - Point nameservers to Cloudflare (instructions appear in dashboard)
   - Wait 24–48 hours for propagation
4. **If domain IS on Cloudflare:**
   - DNS record auto-configures (CNAME to Pages subdomain)
5. **Verify SSL:** Should auto-issue free certificate (Cloudflare managed SSL)

**Test:** Visit https://nanaimocourier.com → should load your site with padlock icon (HTTPS working).

---

## Phase 4: Email Service (Resend)

Form submissions (quote + contact) post to `functions/api/quote.ts` and `functions/api/contact.ts`, which send emails via Resend.

### Step 4.1: Create Resend Account

1. Go to https://resend.com
2. **Sign up** with your email
3. **Create project:** Name it "Nanaimo Courier" or similar
4. **Get API key:** Go to **Integrations** → **API Keys** → Copy your default API key

### Step 4.2: Verify Domain with Resend

1. **In Resend dashboard:** **Domains** → **Add domain** → Enter your domain (e.g., `nanaimocourier.com`)
2. **Resend provides SPF, DKIM, DMARC records**

Copy these records:

**SPF Record (copy to Cloudflare DNS):**
```
Type: TXT
Name: nanaimocourier.com
Value: v=spf1 include:resend.com ~all
```

**DKIM Record (Resend gives you 3 records; add all to Cloudflare):**
```
Type: CNAME
Name: [resend-provided-key].[subdomain-prefix].nanaimocourier.com
Value: [resend-cname-target]
```
(Resend dashboard will show exact values—copy them exactly)

**DMARC Record (starts reporting only, tighten later):**
```
Type: TXT
Name: _dmarc.nanaimocourier.com
Value: v=DMARC1; p=none; rua=mailto:postmaster@nanaimocourier.com; ruf=mailto:forensics@nanaimocourier.com
```

### Step 4.3: Add DNS Records to Cloudflare

1. **Cloudflare dashboard** → **Your domain** → **DNS** → **Records**
2. **Add the SPF, DKIM, DMARC records** from Step 4.2 (copy values exactly)
3. **Wait 1–2 hours** for DNS propagation

### Step 4.4: Update Cloudflare Pages Environment Variable

1. **Cloudflare Pages** → **Your project** → **Settings** → **Environment variables**
2. **Add:**
   ```
   RESEND_API_KEY = [Your Resend API key from Step 4.1]
   NOTIFY_EMAIL = dispatch@nanaimocourier.com (or your dispatcher email)
   ```
3. **Redeploy** (or wait for next git push to auto-deploy)

### Step 4.5: Test Email Delivery

1. Visit your site at https://nanaimocourier.com/contact
2. **Fill out contact form** → Submit
3. **Check your inbox** (dispatch email from Step 4.4)
4. **Run mail-tester check:** Go to https://www.mail-tester.com
   - Get a test email address
   - Submit your contact form to that address
   - Check score (target 9+/10 for inbox placement)

---

## Phase 5: Cloudflare Turnstile (Bot Protection)

Forms include Cloudflare Turnstile for spam prevention.

### Step 5.1: Create Turnstile Widget

1. **Cloudflare dashboard** → **Workers & Pages** → **Turnstile** → **Create site**
2. **Domain:** `nanaimocourier.com`
3. **Mode:** Managed (Cloudflare decides challenge level)
4. **Copy Site Key and Secret Key** (you'll need both)

### Step 5.2: Add Keys to Cloudflare Pages Environment

1. **Cloudflare Pages** → **Your project** → **Settings** → **Environment variables**
2. **Add:**
   ```
   TURNSTILE_SITE_KEY = [Copied from Turnstile step 5.1]
   TURNSTILE_SECRET_KEY = [Copied from Turnstile step 5.1]
   ```
3. **Redeploy**

### Step 5.3: Replace Placeholder in Code

The forms currently have `data-sitekey="TURNSTILE_SITE_KEY_PLACEHOLDER"`. Ideally, update the component to use the env var dynamically, or:

1. Edit `src/components/QuoteForm.astro` and `src/pages/contact.astro`
2. Find `TURNSTILE_SITE_KEY_PLACEHOLDER`
3. Replace with your actual Turnstile site key
4. Commit and push

Or keep the placeholder and wire it via environment—your developer can show you the best pattern.

---

## Phase 6: Google Analytics 4

### Step 6.1: Create GA4 Property

1. Go to https://analytics.google.com
2. **Create new property** → Name: "Nanaimo Courier"
3. **Data collection:** Select "Web"
4. **Website URL:** https://nanaimocourier.com
5. **Create property**
6. **Get Measurement ID:** Look for "G-" code (e.g., `G-XXXXXXXXXX`)

### Step 6.2: Add to Cloudflare Pages Environment

1. **Cloudflare Pages** → **Your project** → **Settings** → **Environment variables**
2. **Add:**
   ```
   GA_MEASUREMENT_ID = G-XXXXXXXXXX
   ```
3. **Redeploy**

### Step 6.3: Verify GA4 is Tracking

1. Visit https://nanaimocourier.com
2. **Go to Google Analytics** → **Real-time** → You should see yourself as an active user
3. Fill out a form; you should see a "form submission" event (if configured in GA4)

---

## Phase 7: Google Business Profile & Search Console

### Step 7.1: Create/Claim Google Business Profile

1. Go to https://www.google.com/business
2. **Create or claim business** → "Nanaimo Courier"
3. **Address:** [Your business address—REQUIRED for map pack]
4. **Phone:** [Your dispatcher phone]
5. **Website:** https://nanaimocourier.com
6. **Service area:** Nanaimo, BC; central Vancouver Island (or custom)
7. **Hours of operation:** Mon–Fri 7 AM–6 PM, Sat–Sun 8 AM–4 PM (update as needed)
8. **Categories:** Courier Service, Delivery Service, Logistics
9. **Verify:** Via postcard or phone (Google sends postcard with verification code)

**Critical:** Without verification, your business won't appear in Google Maps. Prioritize this step.

### Step 7.2: Verify in Google Search Console

1. Go to https://search.google.com/search-console
2. **Add property** → URL prefix: `https://nanaimocourier.com`
3. **Verify ownership:** Choose DNS TXT method
4. Copy the TXT record value

In **Cloudflare DNS**:
```
Type: TXT
Name: nanaimocourier.com
Value: [Google-provided verification code]
```

5. Return to Search Console → **Verify**
6. **Submit sitemap:** https://nanaimocourier.com/sitemap.xml

---

## Phase 8: Cloudflare Security & WAF

### Step 8.1: Enable WAF & Bot Protection

1. **Cloudflare dashboard** → **Your domain** → **Security** → **WAF**
2. **Managed rules:** Enable "Cloudflare Managed Ruleset" (Medium)
3. **Bot Fight Mode:** Enable

This protects against common attacks and malicious bots (while allowing legitimate Turnstile traffic).

---

## Phase 9: Uptime & Error Monitoring

### Option A: UptimeRobot (Free, Recommended)

1. Go to https://uptimerobot.com
2. **Create account** → **Create monitor**
3. **Monitor type:** HTTP(s)
4. **URL:** https://nanaimocourier.com
5. **Frequency:** Every 5 minutes
6. **Notifications:** Email on downtime
7. **Repeat for form endpoint:** https://nanaimocourier.com/api/quote

### Option B: Cloudflare Health Checks

1. **Cloudflare dashboard** → **Workers & Pages** → **Health Checks**
2. Create a check for your Pages domain
3. Same config as UptimeRobot above

---

## Phase 10: Post-Deployment Verification Tests

Run these **in order** after site is live:

### Test 10.1: Form Submissions

1. **Submit quote form:** Fill out `/` → "Get Quote Now"
   - Should see success message
   - Check dispatch email — quote should arrive
2. **Submit contact form:** Visit `/contact` → "Request Callback"
   - Same checks as above

### Test 10.2: Email Deliverability

1. Go to https://www.mail-tester.com
2. Get a test email address
3. Submit forms to that email
4. Check mail-tester score (target 9–10/10)
5. If score is low (spam folder risk):
   - Re-check SPF, DKIM, DMARC records in Cloudflare DNS
   - Wait 2–4 hours for TTL propagation
   - Restest

### Test 10.3: Mobile-Friendly & Rich Results

1. **Google Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
   - Input: https://nanaimocourier.com
   - Should show "Page is mobile friendly"

2. **Google Rich Results Test:** https://search.google.com/test/rich-results
   - Input: https://nanaimocourier.com
   - Should show LocalBusiness and breadcrumb schema (green checkmarks)

### Test 10.4: Domain & SSL

1. **Navigate to:**
   - https://nanaimocourier.com (apex)
   - https://www.nanaimocourier.com (www subdomain)
2. **Both should:**
   - Load your site (no redirect loops)
   - Show green padlock (valid SSL certificate)
   - Same content

3. **If www doesn't work:**
   - Cloudflare DNS → Add CNAME record:
     ```
     Type: CNAME
     Name: www
     Value: nanaimocourier.com
     Proxy status: Proxied (orange cloud)
     ```

### Test 10.5: Open Graph & Social Sharing

1. **iMessage / Facebook / Slack:** Paste https://nanaimocourier.com into each
2. **Should preview with:**
   - Title: "Nanaimo Courier — Same-Day Delivery for Vancouver Island"
   - Description: "Fast • Reliable • Professional"
   - Image: Branded OG image (blue + red, courier box icon)
   - Click preview → should open site

---

## Phase 11: Initial Review Seeding (Lead Generation Jumpstart)

Once live, reach out to your first few courier customers:

**Email Template:**
```
Hi [Customer Name],

Thanks for using [Business Name] for your recent delivery. 

If you had a good experience, we'd love your feedback on Google. 
It helps other businesses find us.

[Link to your Google Business Profile review prompt]

Thanks for your support!
[Your Team]
```

**Goal:** Get 5–10 reviews in your first month. They boost local SEO visibility immediately.

---

## Phase 12: Backup & Restore Procedure

For a static Astro site, **the backup is your GitHub repository**. The restore test:

### Restore Test (Do This Once)

1. **In Cloudflare Pages:**
   - Go to your project → **Deployments**
   - Find a previous successful deployment
   - Click **Rollback** → **Rollback to this deployment**
2. **Site should revert to that version** within seconds
3. **Confirm:** Visit site, verify it matches the old version

**Form submission data:** Quote and contact forms post to Resend (email delivery) and optionally to Cloudflare KV (backup log). **If email fails, forms don't retry automatically**—you must implement KV backup logging or use a queue service. For now, ensure your Resend setup is solid so emails go through on first try.

---

## Phase 13: Ongoing Maintenance

### Weekly
- Check if forms are submitting (visit your email)
- Spot-check site for broken links (visual test)

### Monthly
- **Google Search Console:** Check impressions, clicks, average position
- **Google Business Profile:** Respond to any reviews (even negative ones)
- **Solicit reviews:** Email 2–3 satisfied customers asking for Google reviews

### Quarterly
- Publish one blog post (e.g., "What is same-day courier delivery?" or "Why rush delivery matters")
- Refresh outdated content (e.g., update hours if they changed, update rates if pricing changed)
- Check **Core Web Vitals** in Google Search Console (should stay green)

### Annually
- Full audit of pages (addresses, hours, service area accuracy)
- Lighthouse score check (should stay ≥95)
- Competitor keyword research (SEO benchmark)

---

## Troubleshooting

### "Forms aren't sending emails"
- ✅ Check Resend API key in Cloudflare Pages environment variables
- ✅ Check NOTIFY_EMAIL is correct
- ✅ Check SPF/DKIM records in Cloudflare DNS (DNS propagation can take 2–4 hours)
- ✅ Check Resend dashboard for bounce/failure logs

### "Site not appearing in Google Maps"
- ✅ Verify Google Business Profile address (no partial addresses)
- ✅ Verify your business location in Google Business Profile (pin on map)
- ✅ Wait 2–4 weeks for Google's index to refresh
- ✅ Check Search Console for any indexing errors

### "SSL certificate error"
- ✅ Ensure domain is proxied through Cloudflare (orange cloud icon in DNS records)
- ✅ Ensure both `nanaimocourier.com` and `www.nanaimocourier.com` point to Pages (CNAME records)
- ✅ Give it 10–15 min after adding CNAME; Cloudflare auto-issues cert

### "Turnstile not working"
- ✅ Check TURNSTILE_SITE_KEY and SECRET_KEY in Cloudflare Pages environment
- ✅ Ensure site key matches domain in Turnstile dashboard
- ✅ Check browser console (F12) for errors

### "Can't login to Cloudflare / Resend / Google"
- ✅ Use your actual email (not a business email that doesn't exist)
- ✅ Check spam folder for verification emails
- ✅ Use account recovery if needed

---

## DNS Record Summary (Copy-Paste Ready)

**In Cloudflare DNS (replace `nanaimocourier.com` with your domain):**

```
# Cloudflare Pages
Type: CNAME
Name: nanaimocourier.com
Value: your-project.pages.dev
Proxy status: Proxied (orange cloud)

# WWW subdomain
Type: CNAME
Name: www
Value: nanaimocourier.com
Proxy status: Proxied (orange cloud)

# Resend SPF
Type: TXT
Name: nanaimocourier.com
Value: v=spf1 include:resend.com ~all

# Resend DKIM (Resend dashboard gives you exact values; add all three)
Type: CNAME
Name: [resend-key-1].[subdomain].nanaimocourier.com
Value: [resend-cname-target-1]
# Repeat for key 2 and key 3

# Resend DMARC
Type: TXT
Name: _dmarc.nanaimocourier.com
Value: v=DMARC1; p=none; rua=mailto:postmaster@nanaimocourier.com; ruf=mailto:forensics@nanaimocourier.com

# Google Search Console Verification (one-time, remove after verification)
Type: TXT
Name: nanaimocourier.com
Value: google-site-verification=[Google-provided code]
```

---

## Environment Variables Summary

**Cloudflare Pages environment variables (Settings → Environment variables):**

```
BUSINESS_NAME = "Your Courier Service Name"
PHONE = "(250) 555-1234"
EMAIL = "dispatch@yourcourier.com"
RESEND_API_KEY = [From Resend dashboard]
NOTIFY_EMAIL = dispatch@nanaimocourier.com
TURNSTILE_SITE_KEY = [From Cloudflare Turnstile]
TURNSTILE_SECRET_KEY = [From Cloudflare Turnstile]
GA_MEASUREMENT_ID = G-XXXXXXXXXX [From Google Analytics]
```

---

## Final Checklist Before Going Live

- [ ] Site accessible at https://nanaimocourier.com (HTTPS, padlock icon)
- [ ] www.nanaimocourier.com also works and redirects to apex
- [ ] Business name, phone, email appear correctly throughout site
- [ ] Quote and contact forms submit without errors
- [ ] Forms send emails to your dispatch address
- [ ] Mobile site looks good (test on actual phone)
- [ ] Google Business Profile created and verified
- [ ] Google Search Console property verified and sitemap submitted
- [ ] Turnstile working (visible on forms, blocking obvious bots)
- [ ] GA4 tracking active (real-time showing visits)
- [ ] Mail-tester score 9+/10 (no spam folder)
- [ ] All internal links work (no 404s)
- [ ] Lighthouse score 90+ (via PageSpeed Insights)

---

## Support & Next Steps

**Questions?** Contact your developer or review the `CLAUDE.md` operating manual in the repo root.

**Ready to rank?** After launch:
1. Solicit 5–10 Google reviews (boost local SEO)
2. Build local citations (411.ca, YellowPages, etc.)
3. Publish blog articles monthly (SEO authority)
4. Monitor Search Console for impressions/clicks (data-driven optimization)

Good luck with the launch! 🚀

---

**Document Version:** 1.0  
**Last Updated:** 2026-07-15  
**Maintained By:** Developer + Renter
