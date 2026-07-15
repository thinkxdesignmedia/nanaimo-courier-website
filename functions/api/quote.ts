export async function onRequest(context: { request: Request; env: any }) {
  if (context.request.method === 'POST') {
    const data = await context.request.json();

    // Placeholder: In production, this would send an email via Resend, SendGrid, or similar
    // For now, log and return success
    console.log('Quote request received:', data);

    // TODO: Send email to business email address
    // const email = context.env.EMAIL || 'dispatch@nanaimocourier.com';
    // Send using Resend API or similar

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote request received. We will contact you shortly.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response('Method not allowed', { status: 405 });
}
