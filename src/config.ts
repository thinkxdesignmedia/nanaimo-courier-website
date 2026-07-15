export const config = {
  businessName: process.env.BUSINESS_NAME || 'Nanaimo Courier',
  phone: process.env.PHONE || '(250) 753-0000',
  email: process.env.EMAIL || 'dispatch@nanaimocourier.com',
  hours: {
    weekday: '7:00 AM - 6:00 PM',
    weekend: '8:00 AM - 4:00 PM',
  },
  serviceArea: 'Nanaimo, BC and Central Vancouver Island',
  sameDay: {
    cutoffWeekday: '3:00 PM',
    cutoffFriday: '2:00 PM',
    cutoffWeekend: '10:00 AM',
  },
};

export const siteConfig = {
  siteName: 'Nanaimo Courier',
  siteUrl: 'https://nanaimocourier.com',
  locale: 'en-CA',
  ga4MeasurementId: process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX', // Placeholder
};
