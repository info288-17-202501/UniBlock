import express from "express";
import {
  loginController,
  registerController,
  sendOTPController,
  verifyOTPController,
  recoverPasswordController,
  logoutController,
  checkAuthController,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/check", checkAuthController);
router.post("/otp-send", sendOTPController);
router.post("/otp-verify", verifyOTPController);
router.post("/recover-password", recoverPasswordController);
router.post("/logout", logoutController);

export { router as authRouter };
