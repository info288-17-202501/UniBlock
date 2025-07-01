import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configura SendGrid (usa variables de entorno en producción)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

// Función para enviar el código
export async function sendVerificationCode(email, code) {
  try {
    await transporter.sendMail({
      from: '"no-reply" <noreply.uniblock@gmail.com>', // Reemplaza TU_USERNAME con tu username de SendGrid
      to: email,
      subject: "Tu código de verificación",
      html: `
        <div>
          <h2>¡Hola!</h2>
          <p>Tu código de verificación es:</p>
          <h1 style="color: #EF5218;">${code}</h1>
          <p>Válido por 5 minutos.</p>
        </div>
      `,
    });
    console.log("Correo enviado a:", email);
    return true;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return false;
  }
}


// Funcion con enlace para recuperar contraseña
export async function sendPasswordResetLink(email, resetLink) {
  try {
    await transporter.sendMail({
      from: '"no-reply" <noreply.uniblock@gmail.com>',
      to: email,
      subject: "Recupera tu contraseña",
      html: `
        <div>
          <h2>Recuperación de contraseña</h2>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href="${resetLink}" style="color: #EF5218;">Restablecer contraseña</a>
          <p>Este enlace es válido por 1 hora.</p>
        </div>
      `,
    });
    console.log("Enlace de recuperación enviado a:", email);
    return true;
  } catch (error) {
    console.error("Error al enviar el enlace de recuperación:", error);
    return false;
  }
}