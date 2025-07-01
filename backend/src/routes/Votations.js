import express from "express";
import {
  createVotationController,
  getVotationsController,
  getVotationControllerID,
  VotationbyUser
} from "../controllers/VotationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

// Importamos el middleware de verificación de voto
import { hasUserVoted } from "../middlewares/hasUserVoted.js";

const router = express.Router();

router.post("/create-votation", authenticateToken, createVotationController);
router.get("/get-votations", getVotationsController);
router.get("/get-votation/:id", hasUserVoted, getVotationControllerID);
router.get("/votation-by-user", VotationbyUser);

export { router as votationRouter };
