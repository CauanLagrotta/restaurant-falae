import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { registerRoutes } from "./registerRoutes";
import { productRoutes } from "./productRoutes";
import { orderRoutes } from "./orderRoutes";
import { cartRoutes } from "./cartRoutes";
import { userRoutes } from "./userRoutes";

export const routes = Router();

// Rotas de autenticação
routes.use("/api/auth", authRoutes);

// Rotas de registro
routes.use("/api/auth/register", registerRoutes);

// Rotas de produtos
routes.use("/api/products", productRoutes);

// Rotas de carrinho
routes.use("/api/carts", cartRoutes);

// Rotas de pedido
routes.use("/api/orders", orderRoutes);

// Rotas para o crud de usuários
routes.use("/api/users", userRoutes);