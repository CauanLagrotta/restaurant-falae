import { Router } from "express";
import { RegisterController} from "../controllers/registerController";

export const registerRoutes = Router();

const registerController  = new RegisterController()

// Endpoint para autenticação
registerRoutes.post("/", registerController.register as any);


