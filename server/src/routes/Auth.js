import express from "express";
import {
  loginController,
  registerController,
  sendOTPController,
  verifyOTPController,
  recoverPasswordController,

} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController );
router.post("/otp/send", sendOTPController );
router.post("/otp/verify", verifyOTPController );
router.post("/recover-password", recoverPasswordController);


export {router as authRouter};