import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { verifyUser } from "../middlewares/authMiddleware";

export const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post("/", verifyUser as any, orderController.createOrder as any);
orderRoutes.get("/", orderController.getAllOrders as any);
orderRoutes.get("/user-orders", verifyUser as any, orderController.getUserOrders as any);
orderRoutes.get("/:id", orderController.getOrder as any);
orderRoutes.put("/:id", orderController.updateOrderStatus as any);
orderRoutes.delete("/:id", orderController.deleteOrder as any);


