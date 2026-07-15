import type { APIRoute } from 'astro';
import { siteConfig } from '../config';

const routes = [
  '',
  '/services/same-day-delivery',
  '/services/rush-delivery',
  '/services/medical-courier',
  '/services/legal-courier',
  '/services/scheduled-delivery',
  '/services/freight-delivery',
  '/routes/nanaimo-victoria',
  '/routes/nanaimo-comox',
  '/routes/nanaimo-parksville',
  '/routes/nanaimo-port-alberni',
  '/pricing',
  '/industries',
  '/faq',
  '/blog',
  '/blog/same-day-delivery-cutoff-times',
  '/blog/courier-vs-canada-post-purolator',
  '/blog/legal-document-delivery-bc',
  '/blog/hot-shot-delivery-explained',
  '/about',
  '/contact',
];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${siteConfig.siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
