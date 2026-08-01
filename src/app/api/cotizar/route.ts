import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body = await request.json();
    const { name, phone, email, commune, modelId, poolColor, message, website, visitDate, visitTime, projectType } = body;

    // 1. HONEYPOT: Si el bot llenó el campo oculto "website", descartamos silenciosamente
    if (website) {
      console.log('Spam bot detectado por honeypot. Descartando silenciosamente.');
      return NextResponse.json({ success: true, message: 'Recibido' }); // Falso positivo para engañar al bot
    }

    // 2. VALIDACIÓN BÁSICA DE LONGITUD (Evitar payloads inmensos)
    if (!name || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    if (name.length > 100 || email.length > 150 || phone.length > 50) {
      return NextResponse.json({ success: false, error: 'Campos exceden la longitud permitida' }, { status: 400 });
    }

    const safeMessage = message ? message.substring(0, 1000) : 'Sin mensaje adicional.';

    // SEND EMAIL TO OWNER
    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: 'Cotizaciones Fettyna Gocha <ventas@fettynagocha.cl>',
      to: process.env.OWNER_EMAIL as string,
      subject: `Nueva Cotización de Piscina - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #006FAD; border-bottom: 2px solid #F59E0B; padding-bottom: 10px;">Nueva Solicitud de Cotización</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Comuna:</strong> ${commune}</p>
          ${projectType ? `<p><strong>Tipo de Proyecto:</strong> ${projectType}</p>` : ''}
          <p><strong>Modelo de Interés:</strong> ${modelId || 'No especificado'}</p>
          <p><strong>Color Deseado:</strong> ${poolColor || 'No especificado'}</p>
          
          ${(visitDate && visitTime) ? `
          <div style="background-color: #ECFEFF; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #06B6D4;">
            <p style="margin: 0; color: #0891B2;"><strong>Visita a Terreno Solicitada:</strong></p>
            <p style="margin: 5px 0 0 0;">Fecha: <strong>${visitDate}</strong> - Jornada: <strong>${visitTime}</strong></p>
          </div>
          ` : ''}

          <div style="background-color: #F8FAFC; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 0;"><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (ownerError) {
      console.error('Error sending email to owner:', ownerError);
      return NextResponse.json({ success: false, error: ownerError.message }, { status: 400 });
    }

    // SEND AUTO-REPLY TO CLIENT
    const { error: clientError } = await resend.emails.send({
      from: 'Piscinas Fettyna Gocha <ventas@fettynagocha.cl>',
      to: email,
      subject: `¡Hola ${name.split(' ')[0]}! Recibimos tu solicitud 🏊‍♂️`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #006FAD;">¡Gracias por cotizar con nosotros!</h2>
          <p>Hola <strong>${name.split(' ')[0]}</strong>,</p>
          <p>Hemos recibido correctamente tus datos y tu solicitud de cotización para instalación en <strong>${commune}</strong>.</p>
          
          ${(visitDate && visitTime && visitDate !== 'Solo Presupuesto') ? `
          <p>Hemos notado que solicitaste una visita a terreno para el <strong>${visitDate}</strong> en la jornada de <strong>${visitTime}</strong>. Un ejecutivo se contactará contigo pronto a tu número (${phone}) para confirmar el horario exacto.</p>
          ` : `
          <p>Nuestro equipo está evaluando tu solicitud y nos pondremos en contacto contigo a la brevedad a tu número (${phone}) para enviarte un presupuesto detallado.</p>
          `}
          
          <p>Si tienes alguna duda urgente, no dudes en escribirnos a nuestro WhatsApp oficial o respondiendo a este mismo correo.</p>
          <br/>
          <p>Saludos cordiales,</p>
          <p><strong>El equipo de Piscinas Fettyna Gocha</strong></p>
          <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #EEE; padding-top: 10px;">
            Este es un correo automático. Por favor no respondas a este mensaje si no es necesario.
          </p>
        </div>
      `,
    });

    if (clientError) {
      console.error('Error sending auto-reply to client:', clientError);
      // We don't fail the whole request if the client email fails, just log it.
    }

    return NextResponse.json({ success: true, data: ownerData });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
