import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {  email } =body;

    if ( !email) {
      return NextResponse.json(
        { error: ' field email is required.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'r0525610179@gmail.com',
        pass: process.env.MAIL_SENDER_ID,
      },
    });

    const mailOptions = {
      from: 'r0525610179@gmail.com',
      to: email,
      subject: `New message from 2Study`,
      text: "your password is ",
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
