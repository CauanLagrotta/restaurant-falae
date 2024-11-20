import { Router } from "express";
import { ProductController } from "../controllers/productController";

export const productRoutes = Router();

const productController = new ProductController()

productRoutes.post("/", productController.create as any);
productRoutes.get('/', productController.productAll as any)
productRoutes.get('/:id', productController.productById as any)
productRoutes.delete('/:id', productController.delete as any)
productRoutes.put('/:id', productController.update as any)
 