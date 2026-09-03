import type { APIRoute } from 'astro';
import { config, siteConfig } from '../config';

// llms.txt — orients AI crawlers (Perplexity, ChatGPT, etc.) to the key pages.
// Config-driven so it stays correct when the site is re-rented under a new brand.
export const GET: APIRoute = () => {
  const u = siteConfig.siteUrl;
  const body = `# ${config.businessName}

> Same-day courier and delivery service for ${config.serviceArea}. Rush, medical, legal, scheduled, and retail pickup (Walmart, grocery, IKEA), plus daily routes to Victoria, Comox, Parksville, and Port Alberni.

Contact: ${config.email}
Hours: Weekdays ${config.hours.weekday}, Weekends ${config.hours.weekend}
Same-day cutoffs: weekday ${config.sameDay.cutoffWeekday}, Friday ${config.sameDay.cutoffFriday}, weekend ${config.sameDay.cutoffWeekend}

## Services
- [Same-Day Delivery](${u}/services/same-day-delivery/)
- [Rush & Hot-Shot Delivery](${u}/services/rush-delivery/)
- [Medical Courier](${u}/services/medical-courier/)
- [Legal Courier & Court Filings](${u}/services/legal-courier/)
- [Scheduled Delivery](${u}/services/scheduled-delivery/)
- [Walmart Pickup](${u}/services/walmart-pickup/)
- [Grocery Delivery](${u}/services/grocery-pickup/)
- [IKEA Delivery](${u}/services/ikea-delivery/)

## Routes
- [Nanaimo to Victoria](${u}/routes/nanaimo-victoria/)
- [Nanaimo to Comox](${u}/routes/nanaimo-comox/)
- [Nanaimo to Parksville](${u}/routes/nanaimo-parksville/)
- [Nanaimo to Port Alberni](${u}/routes/nanaimo-port-alberni/)

## More
- [Pricing](${u}/pricing/)
- [Industries](${u}/industries/)
- [FAQ](${u}/faq/)
- [Blog](${u}/blog/)
- [Contact](${u}/contact/)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
