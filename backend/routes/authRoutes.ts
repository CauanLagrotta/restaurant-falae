import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { verifyUser } from "../middlewares/authMiddleware";
import { ForgotPasswordController } from "../controllers/forgotpasswordController";
import { ResetPasswordController } from "../controllers/resetpasswordController";

export const authRoutes = Router();

const authController = new AuthController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// Rotas de autenticação
authRoutes.post("/login", authController.login as any);
authRoutes.get("/header", verifyUser as any, authController.verifyUser as any);
authRoutes.get("/logout", authController.logout as any);

// Rota para recuperação de senha
authRoutes.post(
  "/forgot-password",
  forgotPasswordController.forgotPassword.bind(forgotPasswordController) as any
);

authRoutes.get("/reset-password/:userid/:token", resetPasswordController.getResetPassword as any);
authRoutes.post("/reset-password/:userid/:token", resetPasswordController.postResetPassword as any);