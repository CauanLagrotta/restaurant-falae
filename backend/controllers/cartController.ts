import { Request, Response } from "express";
import { prisma } from "../db/database";

export class CartController {
  async addItemToCart(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;

      let cart = await prisma.orders.findFirst({
        where: { userId, orderstatus: "Carrinho" },
      });

      if (cart) {
        await prisma.orderItem.upsert({
          where: {
            orderId_productId: {
              orderId: cart.id,
              productId,
            },
          },
          update: {
            orderquantity: {
              increment: quantity,
            },
          },
          create: {
            orderId: cart.id,
            productId,
            orderquantity: quantity,
          },
        });

        await this.updateCartTotal(cart.id);

        res.status(200).json({ message: "Item atualizado no carrinho." });
      } else {
        cart = await prisma.orders.create({
          data: { userId, orderstatus: "Carrinho", totalPrice: 0 },
        });

        await prisma.orderItem.create({
          data: {
            orderId: cart.id,
            productId,
            orderquantity: quantity,
          },
        });

        await this.updateCartTotal(cart.id);

        res.status(201).json({ message: "Carrinho criado e item adicionado." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao adicionar item ao carrinho." });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const cart = await prisma.orders.findFirst({
        where: { userId, orderstatus: "Carrinho" },
        include: { OrderItems: { include: { productOrder: true } } },
      });

      if (!cart) {
        return res.status(404).json({ message: "Carrinho não encontrado." });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter o carrinho." });
    }
  }

  async updateCartTotal(orderId: number) {
    try {
      const items = await prisma.orderItem.findMany({
        where: { orderId },
        include: { productOrder: true },
      });

      const totalPrice = items.reduce((sum, item) => {
        return sum + item.orderquantity * item.productOrder.productprice;
      }, 0);

      await prisma.orders.update({
        where: { id: orderId },
        data: { totalPrice },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o total do carrinho.");
    }
  }
}
