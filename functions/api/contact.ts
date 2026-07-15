export async function onRequest(context: { request: Request; env: any }) {
  if (context.request.method === 'POST') {
    const data = await context.request.json();

    // Placeholder: In production, this would send an email
    console.log('Contact request received:', data);

    // TODO: Send email with contact form details
    // const email = context.env.EMAIL || 'dispatch@nanaimocourier.com';

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message was received. We will get back to you soon.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response('Method not allowed', { status: 405 });
}
