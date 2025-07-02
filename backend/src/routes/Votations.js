import express from "express";
import {
  createVotationController,
  getVotationsController,
  getVotationControllerID,
  VotationbyUser,
  getVotationResults

} from "../controllers/VotationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.js";

// Importamos el middleware de verificación de voto
import { hasUserVoted } from "../middlewares/hasUserVoted.js";

const router = express.Router();

router.post("/create-votation", authenticateToken, isAdminMiddleware, createVotationController);
router.get("/get-votations",authenticateToken, getVotationsController);
router.get("/get-votation/:id", hasUserVoted, getVotationControllerID);
router.get("/votation-by-user", authenticateToken, isAdminMiddleware , VotationbyUser);
router.get("/results/:id", authenticateToken, getVotationResults);

export { router as votationRouter };
