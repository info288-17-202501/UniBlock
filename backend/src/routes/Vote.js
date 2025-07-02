import express from "express";
import { createVoteController , sendVotestoBlockchainController} from "../controllers/VoteController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/create-votation", createVoteController);
router.post("/send-votes/:id", sendVotestoBlockchainController);



export { router as voteRouter };