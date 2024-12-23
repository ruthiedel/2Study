import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {getPasswordByEmail} from '../../../../services/mongo/mailMngo'
import bcrypt from 'bcryptjs';




const generateRandomPassword = (length: number = 6): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;
    
        if (!email) {
          return NextResponse.json(
            { error: 'Field email is required.' },
            { status: 400 }
          );
        }
    
        const newPassword = generateRandomPassword();
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
            const { status, message } = await getPasswordByEmail(email, hashedPassword);
        if (status !== 200) {
          return NextResponse.json({ error: message }, { status });
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
          subject: 'New password from 2Study',
          text: `Your new password is: ${newPassword}`,
        };
    
        await transporter.sendMail(mailOptions);
    
        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
      }
}
