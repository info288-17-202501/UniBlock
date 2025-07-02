import { Votation, Candidate } from '../models/index.js';
import VoteCast from '../models/votes_cast.js';
import jwt from 'jsonwebtoken';

export async function createVotationController(req, res) {
  try {
    const { title, description, isPublic, candidates, startDate, endDate, startTime, endTime } = req.body;
    const user_id = req.user.id;

    // Convertir startTime y endTime a formato HH:MM:SS
    function formatTimeToHHMMSS(timeString) {
      if (!timeString) return null; 
      const date = new Date(`1970-01-01T${timeString}:00Z`);
      return date.toISOString().substring(11, 19);
    }

    const formattedStartTime = formatTimeToHHMMSS(startTime);
    const formattedEndTime = formatTimeToHHMMSS(endTime);

    const savedVotation = await Votation.create({
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      public: isPublic,
      UUID_user: user_id
    });

    if (Array.isArray(candidates) && candidates.length > 0) {
      const candidateEntries = candidates.map((candidate) => ({
        name: candidate.name,
        email: candidate.email,
        id_votation: savedVotation.id
      }));

      await Candidate.bulkCreate(candidateEntries);
    }


    res.status(201).json({
      message: "Votation created successfully",
      votation: savedVotation
    });
  } catch (err) {
    console.error("Error al crear la votación:", err);
    res.status(500).json({
      message: "Error al crear la votación",
      error: err.message
    });
  }

}

export async function getVotationsController(req, res) {
  try {
    // 1. Obtener todas las votaciones
    const votations = await Votation.findAll();

    const now = new Date();

    // 2. Revisar cuáles votaciones están activas pero ya pasaron su fecha/hora de término
    const updates = await Promise.all(
      votations.map(async (votation) => {
        if (votation.status === "Activo") {
          const endDateTime = new Date(`${votation.end_date}T${votation.end_time}`);
          if (now > endDateTime) {
            // Si ya pasó la fecha/hora de término, actualizar status a 'Pendiente'
            votation.status = "Pendiente";
            await votation.save();
          }
        }
        return votation;
      })
    );

    res.status(200).json({ votations: updates });
  } catch (err) {
    console.error("Error al recuperar votaciones:", err);
    res.status(500).json({ message: "Error retrieving votations", error: err.message });
  }
}

export async function getVotationControllerID(req, res) {
  const { id } = req.params;

  try {
    let votation = await Votation.findByPk(id, {
      include: [{ model: Candidate, as: 'candidates' }]
    });

    if (!votation) {
      return res.status(404).json({ message: "Votation not found" });
    }

    // Calcular fecha y hora de término combinadas
    const now = new Date();

    const endDateTime = new Date(
      `${votation.end_date.toISOString().split("T")[0]}T${votation.end_time}`
    );

    // Solo actualizar si no está terminada
    if (
      votation.status !== "Terminado" &&
      now > endDateTime &&
      votation.status !== "Pendiente"
    ) {
      votation.status = "Pendiente";
      await votation.save();
    }

    res.status(200).json({ votation });
  } catch (err) {
    console.error("Error retrieving votation:", err);
    res.status(500).json({ message: "Error retrieving votation", error: err.message });
  }
}

//verificar el usuario ya votó
export async function hasUserVoted(req, res) {
  const { votationId } = req.params;

  // 1. Obtener el token de la cookie
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

  try {
    const hasVoted = await VoteCast.findOne({
      where: {
        votation_id: votationId,
        user_id: userId
      }
    });

    if (hasVoted) {
      return res.status(200).json({ hasVoted: true });
    } else {
      return res.status(200).json({ hasVoted: false });
    }
  } catch (err) {
    console.error("Error checking if user has voted:", err);
    res.status(500).json({ message: "Error checking if user has voted", error: err.message });
  }
}


export async function VotationbyUser(req, res) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado: No se encontró token de acceso" });
  }

  let userId;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    userId = decodedToken.id;
  } catch (error) {
    console.error("Error al verificar o decodificar el token:", error);
    return res.status(401).json({ message: "No autorizado: Token inválido o expirado" });
  }

  try {
    const votations = await Votation.findAll({
      where: { UUID_user: userId },
    });

    if (!votations || votations.length === 0) {
      return res.status(404).json({ message: "No votations found for this user" });
    }
  

    const now = new Date();

    // Procesar cada votación
    const updatedVotations = await Promise.all(
      votations.map(async (votation) => {
        const endDateTime = new Date(`${votation.end_date.toISOString().split('T')[0]}T${votation.end_time}`);

        if (votation.status !== "Terminado" && now > endDateTime) {
          // actualizar en la base de datos
          await votation.update({ status: "Pendiente" });
          return { ...votation.dataValues, status: "Pendiente" };
        }

        return votation;
      })
    );

    res.status(200).json({ votations: updatedVotations });
  } catch (err) {
    console.error("Error retrieving votations by user:", err);
    res.status(500).json({ message: "Error retrieving votations by user", error: err.message });
  }
}


// Obtener los resultados de una votación
export async function getVotationResults(req, res) {
  const { id } = req.params;

  try {
    const votation = await Votation.findByPk(id, {
      include: [{ model: Candidate, as: "candidates" }],
    });

    if (!votation) {
      return res.status(404).json({ message: "Votación no encontrada" });
    }

    if (votation.status !== "Terminado") {
      return res
        .status(400)
        .json({ message: "La votación aún no ha finalizado" });
    }

    // Calcular total de votos sumando los votos de todos los candidatos
    const totalVotes = votation.candidates.reduce(
      (sum, candidate) => sum + Number(candidate.number_of_votes || 0),
      0
    );

  
    res.status(200).json({
      votation,
      totalVotes,
    });
  } catch (err) {
    console.error("Error al obtener resultados de votación:", err);
    res.status(500).json({
      message: "Error al obtener resultados de votación",
      error: err.message,
    });
  }
}
