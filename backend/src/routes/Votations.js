import express from "express";
import {
  createVotationController,
  getVotationsController,
} from "../controllers/VotationController.js";


const router = express.Router();

router.post("/create-votation", createVotationController);
router.get("/get-votations/:id", getVotationsController);


export { router as votationRouter };