import express from "express";
import { createVoteController , sendVotestoBlockchainController} from "../controllers/VoteController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/create-votation", authenticateToken, createVoteController);
router.post("/send-votes/:id", authenticateToken, isAdminMiddleware, sendVotestoBlockchainController);

export { router as voteRouter };