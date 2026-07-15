/**
 * Quote Form Handler
 * Handles quote requests with:
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

    // Honeypot check: if hidden field is filled, reject silently (return success to fool bots)
    if (formData.website_check) {
      console.warn('Honeypot field triggered');
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
    if (!formData.email || !formData.phone || !formData.pickup_location) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format email content
    const emailBody = `
New Quote Request

Pickup: ${formData.pickup_location}
Dropoff: ${formData.dropoff_location}
Package Size: ${formData.package_size || 'Not specified'}
Needed By: ${formData.needed_by || 'Not specified'}

Contact:
Email: ${formData.email}
Phone: ${formData.phone}

Notes:
${formData.notes || 'None'}

Submitted: ${new Date().toISOString()}
    `.trim();

    // Send via Resend
    const notifyEmail = context.env.NOTIFY_EMAIL || 'dispatch@nanaimocourier.com';
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
            subject: `New Quote Request from ${formData.email}`,
            html: emailBody.replace(/\n/g, '<br />'),
            reply_to: formData.email,
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
          console.log('Quote email sent via Resend');
        } else {
          const errorData = await resendResponse.json();
          console.error('Resend error:', errorData);
        }
      } catch (err) {
        console.error('Resend fetch error:', err);
      }
    }

    // Log to KV as backup (if available)
    if (context.data?.kv) {
      try {
        const quoteId = `quote-${Date.now()}`;
        await context.data.kv.put(
          quoteId,
          JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
          { expirationTtl: 7776000 } // 90 days
        );
        console.log(`Quote logged to KV: ${quoteId}`);
      } catch (kvErr) {
        console.error('KV logging error:', kvErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote request received. We will contact you shortly.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Quote handler error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
