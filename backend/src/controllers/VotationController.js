import Votation from "../models/votations.js";

export async function createVotationController(req, res) {
  try {
    const { user_id, title, description, Ispublic } = req.body;

    const savedVotation = await Votation.create({
      title,
      description,
      start_date: new Date(),
      end_date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      public: Ispublic,
      UUID_user: user_id
    });

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
  const votation = await Votation.findByPk(req.params.id);
  const status = votation.getStatus(); 

  res.json({
    ...votation.toJSON(),
    status, 
  });
}


export function getVotationByIdController(req, res) {
  const { id } = req.params;

  // Aquí iría la lógica para obtener una votación por ID de la base de datos
  // Por ejemplo:
  // const votation = await VotationModel
  //   .findById(id)
  res.status(200).json({ message: "Votation retrieved successfully" });
}
