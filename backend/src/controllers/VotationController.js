import { Votation, Candidate } from '../models/index.js';

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
    const votations = await Votation.findAll();
    res.status(200).json({ votations });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving votations", error: err.message });
  }
}

export async function getVotationControllerID(req, res) {
  const { id } = req.params;

  try {
    const votation = await Votation.findByPk(id, {
      include: [{ model: Candidate, as: 'candidates' }]
    });

    if (!votation) {
      return res.status(404).json({ message: "Votation not found" });
    }

    res.status(200).json({ votation });
  } catch (err) {
    console.error("Error retrieving votation:", err);
    res.status(500).json({ message: "Error retrieving votation", error: err.message });
  }
}