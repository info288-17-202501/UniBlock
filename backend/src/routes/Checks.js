import express from "express";
import { checkAdmin } from "../controllers/ChecksController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/isadmin",authenticateToken,isAdminMiddleware, checkAdmin);

export { router as checksRouter };