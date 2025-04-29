import jwt from 'jsonwebtoken';
import { sendVerificationCode } from '../config/mailer.js';
import redisClient  from '../config/redisConnect.js';

export function loginController(req, res) {
  const { email } = req.body;

  const userData = {
    id: 123,
    email,
    role: "admin"
  };

  const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "1h" });

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: false, // true solo si tienes HTTPS, false para localhost
    sameSite: 'strict',
    maxAge: 3600000
  });
  res.status(200).json({ message: "Login successful" });
}

export function checkAuthController(req, res) {
  // 1. Obtener el token de las cookies
  const token = req.cookies.access_token; // Asegúrate que el nombre coincida con cómo guardas el token
  
  // 2. Verificar si el token existe
  if (!token) {
    return res.status(401).json({ 
      authenticated: false,
      message: "Acceso no autorizado - Token no proporcionado" 
    });
  }

  try {
    // 3. Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // 4. Responder con los datos del usuario autenticado
    return res.status(200).json({
      authenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        // Agrega más datos del usuario según lo que incluyas en el token
      }
    });
    
  } catch (error) {
    console.error('Error al verificar token:', error);
    
    // Manejar diferentes tipos de errores
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        authenticated: false,
        message: "Sesión expirada - Por favor inicie sesión nuevamente" 
      });
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        authenticated: false,
        message: "Token inválido - Acceso no autorizado" 
      });
    }
    
    return res.status(500).json({ 
      authenticated: false,
      message: "Error al verificar autenticación" 
    });
  }
}


export function logoutController(req, res) {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logout successful' });
}

export function registerController(req, res) {
  // const { name, email, password } = req.body;

  res.status(201).json({ message: "User registered successfully" });
}

export async function sendOTPController(req, res) {
  const { email } = req.body;
  const code = Math.floor(10000 + Math.random() * 90000).toString();

  await redisClient.set(`otp:${email}`, code, 'EX', 300);

  await sendVerificationCode(email, code);
 
  const sent = sendVerificationCode(email, code);
  if (!sent) {
    return res.status(500).json({ message: "Error sending OTP" });
  }
  res.status(200).json({ message: "OTP sent successfully" });
}

export function verifyOTPController(req, res) {
  const { email, otp } = req.body;
  const storedOTP = redisClient.get(`otp:${email}`);
  if (!storedOTP) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }
  if (storedOTP !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  redisClient.del(`otp:${email}`); 
  res.status(200).json({ message: "OTP verified successfully" });
}

export function recoverPasswordController(req, res) {
  // const { email, newPassword } = req.body;

  res.status(200).json({ message: "Password recovered successfully" });
}