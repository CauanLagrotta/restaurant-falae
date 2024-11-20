import { Router } from "express";
import { CartController } from "../controllers/cartController";
import { verifyUser } from "../middlewares/authMiddleware";

export const cartRoutes = Router();

const cartController = new CartController();

cartRoutes.post("/", verifyUser as any, cartController.addItemToCart as any);
cartRoutes.get("/", verifyUser as any, cartController.getCart as any);
cartRoutes.put("/", verifyUser as any, cartController.updateCartTotal as any);