import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export async function GET({url}) {
    const data = url.searchParams;
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const phone = data.get('phone');

    try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_RECEPTOR,
          replyTo: process.env.EMAIL_USER,
          subject: 'BeeHive Nuevo Contacto',
          html: `Nombre: ${name} <br> Email: ${email} <br> Teléfono: ${phone} <br> Mensaje: ${message}`,
        };
    
        await transporter.sendMail(mailOptions);
        return json(
            { success: true, message: "Email sent successfully" }
        )
    
      } catch (error) {
        return json(
            { success: false, message: 'Email fail' }
        )
      }
}