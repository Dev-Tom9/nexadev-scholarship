import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, course, occupation, state, motivation, laptop } = body;

    // 1. CHANGE THIS: You MUST put the email you used to sign up for Resend here
    const myEmail = "shekinahgloryy9@gmail.com"; 

    const { data, error } = await resend.emails.send({
      from: 'Scholarship Alert <onboarding@resend.dev>',
      to: [myEmail], 
      subject: `New Application: ${firstName} ${lastName} (${course})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #3b82f6; border-radius: 12px; padding: 20px;">
          <h2 style="color: #3b82f6; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Student Application</h2>
          
          <p><strong>Student Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone (WhatsApp):</strong> ${phone}</p>
          <p><strong>Course Applied:</strong> ${course}</p>
          <p><strong>Location:</strong> ${state}</p>
          <p><strong>Current Role:</strong> ${occupation}</p>
          <p><strong>Has Laptop?</strong> ${laptop}</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p><strong>Motivation:</strong></p>
            <p style="font-style: italic;">"${motivation}"</p>
          </div>

          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="https://wa.me/${phone?.replace('+', '')}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Message on WhatsApp</a>
          </div>
        </div>
      `,
    });

    if (error) {
      // This will show you exactly WHY it's 400 in your terminal
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}