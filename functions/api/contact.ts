/**
 * Contact Form Handler
 * Handles contact form submissions with:
 * - Honeypot field (spam prevention)
 * - Cloudflare Turnstile (bot verification)
 * - Resend email delivery
 * - KV store logging (backup)
 */

export async function onRequest(context: {
  request: Request;
  env: {
    RESEND_API_KEY?: string;
    NOTIFY_EMAIL?: string;
    TURNSTILE_SECRET_KEY?: string;
  };
  data?: { kv?: any };
}) {
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await context.request.json();

    // Honeypot check
    if (formData.website_check) {
      console.warn('Honeypot field triggered on contact form');
      return new Response(
        JSON.stringify({ success: true, message: 'Submitted' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Turnstile verification
    const turnstileToken = formData['cf-turnstile-response'];
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'Verification required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const turnstileSecret = context.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/validate',
        {
          method: 'POST',
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
          headers: { 'content-type': 'application/json' },
        }
      );

      const turnstileData = await turnstileResponse.json();
      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({ success: false, error: 'Verification failed' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate required fields
    if (!formData.email || !formData.name) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Name and email are required',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format email content
    const emailBody = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${formData.inquiry || 'Not specified'}

Message:
${formData.message || 'No message provided'}

Submitted: ${new Date().toISOString()}
    `.trim();

    // Send via Resend
    const notifyEmail = context.env.NOTIFY_EMAIL || 'creative@thinkxdesign.com';
    const resendKey = context.env.RESEND_API_KEY;

    let emailSent = false;
    if (resendKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'noreply@nanaimocourier.com',
            to: notifyEmail,
            subject: `Contact Form: ${formData.inquiry || 'Inquiry'} from ${formData.name}`,
            html: emailBody.replace(/\n/g, '<br />'),
            reply_to: formData.email,
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
          console.log('Contact email sent via Resend');
        } else {
          const errorData = await resendResponse.json();
          console.error('Resend error:', errorData);
        }
      } catch (err) {
        console.error('Resend fetch error:', err);
      }
    }

    // Log to KV as backup
    if (context.data?.kv) {
      try {
        const contactId = `contact-${Date.now()}`;
        await context.data.kv.put(
          contactId,
          JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
          { expirationTtl: 7776000 } // 90 days
        );
        console.log(`Contact logged to KV: ${contactId}`);
      } catch (kvErr) {
        console.error('KV logging error:', kvErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message was received. We will get back to you soon.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact handler error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
