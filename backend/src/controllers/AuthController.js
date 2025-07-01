import jwt from "jsonwebtoken";
import {
  sendVerificationCode,
  sendPasswordResetLink,
} from "../config/mailer.js";
import redisClient from "../config/redisConnect.js";
import bcrypt from "bcrypt";
import User from "../models/users.js";
import { generateKeyPair, encryptData } from "../services/cryptoService.js";

export async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    // Buscar usuario con Sequelize
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    if (!user.password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const userData = {
      id: user.id,
      email: user.email,
      role: user.rol,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(userData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // true solo si usas HTTPS
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login exitoso", user: userData });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export function checkAuthController(req, res) {
  // 1. Obtener el token de las cookies
  const token = req.cookies.access_token; // Asegúrate que el nombre coincida con cómo guardas el token

  // 2. Verificar si el token existe
  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "Acceso no autorizado - Token no proporcionado",
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
        isAdmin: decoded.isAdmin,
        // Agrega más datos del usuario según lo que incluyas en el token
      },
    });
  } catch (error) {
    console.error("Error al verificar token:", error);

    // Manejar diferentes tipos de errores
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        authenticated: false,
        message: "Sesión expirada - Por favor inicie sesión nuevamente",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        authenticated: false,
        message: "Token inválido - Acceso no autorizado",
      });
    }

    return res.status(500).json({
      authenticated: false,
      message: "Error al verificar autenticación",
    });
  }
}

export function logoutController(req, res) {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successful" });
}

export async function registerController(req, res) {
  const { username, email, password } = req.body;

  try {
    // 1. Validar formato de email
    const regex = /^[a-zA-Z0-9._%+-]+@alumnos\.uach\.cl$/;
    if (!regex.test(email)) {
      return res
        .status(400)
        .json({ message: "El email debe terminar con @alumnos.uach.cl" });
    }
    
    const userExists = await User.findOne({ where: { email } });

    // Si el usuario ya existe y tiene contraseña, es un conflicto
    if (userExists && userExists.password) {
      return res.status(409).json({ message: "El usuario ya está registrado" });
    }

    // Si el usuario existe pero no tiene contraseña (es de Microsoft), actualizamos
    if (userExists && !userExists.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userExists.update({
        password: hashedPassword,
        nombre: username,
      });

      return res.status(200).json({
        message: "Usuario actualizado con contraseña",
        user: {
          id: userExists.id,
          nombre: userExists.nombre,
          email: userExists.email,
          rol: userExists.rol,
        },
      });
    }

    // Si no existe, lo creamos desde cero

    // 3. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar claves
    const { publicKey, privateKey } = generateKeyPair();
    // Cifrar clave privada
    const { encryptedData: privateKeyEncrypted, iv: ivPriv } =
      encryptData(privateKey);

    // 4. Crear el nuevo usuario
    const newUser = await User.create({
      nombre: username,
      email: email,
      password: hashedPassword,
      rol: "alumno",
      publicKey: publicKey,
      privateKey: privateKeyEncrypted,
      ivPriv: ivPriv,
    });

    // 5. Responder sin la contraseña
    const { id, nombre, email: userEmail, rol, institucion } = newUser;

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: { id, nombre, email: userEmail, rol, institucion },
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function sendOTPController(req, res) {
  const { email } = req.body;
  const code = Math.floor(10000 + Math.random() * 90000).toString();

  await redisClient.set(`otp:${email}`, code, "EX", 300);

  const sent = await sendVerificationCode(email, code);
  if (!sent) {
    return res.status(500).json({ message: "Error sending OTP" });
  }

  res.status(200).json({ message: "OTP sent successfully" });
}

export async function verifyOTPController(req, res) {
  const { email, otp } = req.body;
  const storedOTP = await redisClient.get(`otp:${email}`); // AÑADIR await
  if (!storedOTP) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  if (storedOTP !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await redisClient.del(`otp:${email}`);
  res.status(200).json({ message: "OTP verified successfully" });
}

export async function recoverPasswordController(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Verifica si el usuario existe
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Genera el token de recuperación
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  // Envía el correo con el link de recuperación
  const sent = await sendPasswordResetLink(email, resetLink);
  if (!sent) {
    return res.status(500).json({ message: "Error sending recovery email" });
  }

  res.status(200).json({ message: "Recovery email sent successfully" });
}

// Cambio de contraseña
export async function changePasswordContoller(req, res) {
  const { token, password } = req.body;

  if (!token || !password) {
    return res
      .status(400)
      .json({ message: "Token y nueva contraseña son requeridos" });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;

    // Busca el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Hashea la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualiza la contraseña
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "Cambio de contraseña correcto" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: "El token ha expirado" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: "Token inválido" });
    }
    console.error("Error al cambiar la contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function registerControllerSinVerificacion(req, res) {
  const { username, email, password } = req.body;

  try {
    // Verificar si ya existe un usuario con ese correo
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: "El usuario ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar claves pública y privada
    const { publicKey, privateKey } = generateKeyPair();

    // Cifrar la clave privada
    const { encryptedData: privateKeyEncrypted, iv: ivPriv } = encryptData(privateKey);

    // Crear el nuevo usuario
    const newUser = await User.create({
      nombre: username,
      email,
      password: hashedPassword,
      rol: "administrador",
      isAdmin: true,
      publicKey,
      privateKey: privateKeyEncrypted,
      ivPriv,
    });

    const { id, nombre, email: userEmail, rol, institucion } = newUser;

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: { id, nombre, email: userEmail, rol, institucion },
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
