import express from "express";
import {
  createVotationController,
  getVotationsController,
} from "../controllers/VotationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";


const router = express.Router();

router.post("/create-votation", authenticateToken, createVotationController);
router.get("/get-votations", getVotationsController);


export { router as votationRouter };