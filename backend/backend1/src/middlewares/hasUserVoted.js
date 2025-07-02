import VoteCast from '../models/votes_cast.js'
import jwt from 'jsonwebtoken';

// Simulación de función de verificación (reemplaza con tu lógica real)
async function checkIfUserVoted(userId, votationId) {
  // Aquí deberías consultar tu base de datos para verificar si el usuario ya ha votado
  const vote = await VoteCast.findOne({
    where: {
      user_id: userId,
      votation_id: votationId
    }
  });
  if (vote) {
    return true; // El usuario ya ha votado
  }
  return false; // Cambia esto según tu lógica
}

export const hasUserVoted = (req, res, next) => {
  // Suponiendo que el ID del usuario está en req.user.id
  // y la información de votos está en una base de datos o servicio

  // 1. Obtener el token de la cookie
  const { id: votationId  } = req.params;
  console.log("Votation ID:", votationId);
  const token = req.cookies.access_token; 
  if (!token) {
    return res.status(401).json({ message: "No autorizado: No se encontró token de acceso" });
  }
  let userId;
  try {
    // 2. Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // Extraer el userId del payload del token decodificado
    userId = decodedToken.id;
  } catch (error) {
    console.error("Error al verificar o decodificar el token:", error);
    return res.status(401).json({ message: "No autorizado: Token inválido o expirado" });
  }

  checkIfUserVoted(userId, votationId)
    .then((hasVoted) => {
      if (hasVoted) {
        return res.status(403).json({ message: 'El usuario ya ha votado' });
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error verificando voto', error: err.message });
    });
};
