import { Router } from 'express';
import { UserController } from '../controllers/userController';

export const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.createUser.bind(userController) as any);
userRoutes.get("/", userController.getUsers.bind(userController) as any);
userRoutes.put("/:id", userController.editUser.bind(userController) as any);
userRoutes.delete("/:id", userController.deleteUser.bind(userController) as any);