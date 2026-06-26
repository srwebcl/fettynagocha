import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, commune, modelId, poolColor, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Fettyna Gocha Web <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL as string,
      subject: `Nueva Cotización de Piscina - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #006FAD; border-bottom: 2px solid #F59E0B; padding-bottom: 10px;">Nueva Solicitud de Cotización</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Comuna:</strong> ${commune}</p>
          <p><strong>Modelo de Interés:</strong> ${modelId || 'No especificado'}</p>
          <p><strong>Color Deseado:</strong> ${poolColor || 'No especificado'}</p>
          <div style="background-color: #F8FAFC; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 0;"><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message || 'Sin mensaje adicional.'}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
