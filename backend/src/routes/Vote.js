import express from "express";
import { createVoteController } from "../controllers/VoteController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/create-votation", createVoteController);



export { router as voteRouter };