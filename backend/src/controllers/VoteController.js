import User from "../models/users.js";
import Vote from "../models/votes.js";
import Candidate from "../models/candidates.js";
import VoteCast from "../models/votes_cast.js";
import crypto from "crypto";
import { decryptData } from "../services/cryptoService.js";
import jwt from "jsonwebtoken";
const { constants } = crypto;

export async function createVoteController(req, res) {
  const { votationId, candidateId } = req.body;
  // 1. Obtener el token de la cookie
  const token = req.cookies.access_token; 

  if (!token) {
    return res
      .status(401)
      .json({ message: "No autorizado: No se encontró token de acceso" });
  }

  let email;
  try {
    // 2. Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // Extraer el email del payload del token decodificado
    email = decodedToken.email;
  } catch (error) {
    console.error("Error al verificar o decodificar el token:", error);
    return res
      .status(401)
      .json({ message: "No autorizado: Token inválido o expirado" });
  }

  if (!votationId || !candidateId || !email) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Descifrar la clave privada
    const decryptedPrivateKey = decryptData(user.privateKey, user.ivPriv);

    const timestamp = new Date().toISOString();
    const mensaje = `${votationId}:${candidateId}:${timestamp}`;

    // Firmar
    const firma = crypto
      .sign("sha256", Buffer.from(mensaje), {
        key: decryptedPrivateKey,
        padding: constants.RSA_PKCS1_PSS_PADDING,
      })
      .toString("base64");

    const votoFirmado = {
      votationId,
      candidateId,
      timestamp,
      firma,
      publicKey: user.publicKey,
    };

    // Sumar el voto al candidato segun la id de la votación y el candidato
    const candidate = await Candidate.findOne({
      where: { id_votation: votationId, id: candidateId },
    });
    if (!candidate) {
      return res.status(404).json({ message: "Candidato no encontrado" });
    }
    // Incrementar el número de votos del candidato
    await candidate.increment('number_of_votes', { by: 1 });

    // Guardar el voto en la tabla de votos emitidos
    const voteCast = await VoteCast.create({
      votation_id: votationId,
      user_id: user.id});
    if (!voteCast) {
      return res.status(500).json({ message: "Error al guardar el voto emitido" });
    }
    

    // Guardar el voto en la base de datos
    const newVote = await Vote.create({
      votation_id: votoFirmado.votationId,
      candidate_id: votoFirmado.candidateId,
      timestamp: votoFirmado.timestamp,
      firma: votoFirmado.firma,
      public_key: votoFirmado.publicKey,
    });

    res.status(201).json({
      message: "Voto firmado correctamente",
      voto: votoFirmado,
    });
  } catch (error) {
    console.error("Error al firmar el voto:", error);
    res.status(500).json({ message: "Error interno al firmar el voto" });
  }
}

export function getVotesController(req, res) {
  // Aquí iría la lógica para obtener los votos de la base de datos
  // Por ejemplo:
  // const votes = await VoteModel.find({});

  res.status(200).json({ message: "Votes retrieved successfully" });
}

export function getVoteByIdController(req, res) {
  const { id } = req.params;

  // Aquí iría la lógica para obtener un voto por ID de la base de datos
  // Por ejemplo:
  // const vote = await VoteModel.findById(id);

  res.status(200).json({ message: "Vote retrieved successfully" });
}
