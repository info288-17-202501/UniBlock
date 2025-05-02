import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configura SendGrid (usa variables de entorno en producción)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // ¡Literalmente así! No cambies esto.
    pass: process.env.SENDGRID_API_KEY // Tu API Key de SendGrid
  }
});

// Función para enviar el código
export async function sendVerificationCode(email, code) {
  try {
    await transporter.sendMail({
      from: '"no-reply" <noreply.uniblock@gmail.com>', // Reemplaza TU_USERNAME con tu username de SendGrid
      to: email,
      subject: 'Tu código de verificación',
      html: `
        <div>
          <h2>¡Hola!</h2>
          <p>Tu código de verificación es:</p>
          <h1 style="color: #EF5218;">${code}</h1>
          <p>Válido por 5 minutos.</p>
        </div>
      `
    });
    console.log('Correo enviado a:', email);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return false;
  }
}
