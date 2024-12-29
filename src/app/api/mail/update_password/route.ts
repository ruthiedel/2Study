import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email } =body;


    if ( !email ) {
      return NextResponse.json(
        { error: 'All fields ( email) are required.' },
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
      from: email,
      to: email,
      subject: `2Study update password`,
      text: `
      Please click one of the links below:
      
      For developers: http://localhost:3000/updatePassword
      For users: https://2-study.vercel.app/updatePassword
    `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
