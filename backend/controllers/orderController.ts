import { Request, Response } from "express";
import { prisma } from "../db/database";
import { Product } from "@prisma/client";

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const userId = req.user?.id; 
      const { products }: { products: Product[] } = req.body;
  
      const totalPrice = await Promise.all(
        products.map(async (item: any) => {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
            select: { productprice: true },
          });
  
          if (!product) {
            throw new Error(`Produto com ID ${item.productId} não encontrado.`);
          }
  
          return product.productprice * item.orderquantity;
        })
      ).then((prices) => prices.reduce((acc, price) => acc + price, 0));
  
      const order = await prisma.orders.create({
        data: {
          userOrder: { connect: { id: userId } },
          orderstatus: "Pendente",
          totalPrice,
          OrderItems: {
            create: products.map((item: any) => ({
              productId: item.productId,
              orderquantity: item.orderquantity,
            })),
          },
        },
        include: {
          OrderItems: true,
        },
      });
  
      res.status(201).send({
        msg: "Pedido criado com sucesso.",
        order,
      });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res.status(500).send({ msg: "Erro ao criar pedido.", error: error });
    }
  }
  

  async getOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const order = await prisma.orders.findUnique({
        where: { id: Number(id) },
        include: {
          userOrder: {
            select: {
              username: true,
              useraddress: true,
            },
          },
          OrderItems: {
            include: {
              productOrder: true,
            },
          },
        },
      });

      if (!order) {
        return res.status(404).send({ msg: "Pedido não encontrado." });
      }

      const formattedOrder = {
        id: order.id,
        totalPrice: order.totalPrice,
        status: order.orderstatus,
        createdAt: order.createdAt,
        address: order.userOrder.useraddress,
        products: order.OrderItems.map((item: any) => ({
          name: item.productOrder.productname,
          orderquantity: item.orderquantity,
          price: item.productOrder.productprice,
          imageUrl: item.productOrder.productImageUrl,
        })),
      };

      res.status(200).send(formattedOrder);
    } catch (error) {
      console.error("Erro ao obter pedido:", error);
      res.status(500).send({ msg: "Erro ao obter pedido.", error: error });
    }
  }

  async getUserOrders(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
  
      if (!userId) {
        return res.status(400).send({ msg: "Usuário não autenticado." });
      }
  
      const orders = await prisma.orders.findMany({
        where: { userId },
        include: {
          OrderItems: {
            include: {
              productOrder: true,
            },
          },
        },
      });
  
      if (!orders.length) {
        return res.status(404).send({ msg: "Nenhum pedido encontrado para este usuário." });
      }
  
      const formattedOrders = orders.map((order) => ({
        id: order.id,
        totalPrice: order.totalPrice,
        status: order.orderstatus,
        createdAt: order.createdAt,
        products: order.OrderItems.map((item) => ({
          productname: item.productOrder.productname,
          orderquantity: item.orderquantity,
          productprice: item.productOrder.productprice,
          productImageUrl: item.productOrder.productImageUrl,
        })),
      }));
  
      res.status(200).send(formattedOrders);
    } catch (error) {
      console.error("Erro ao obter pedidos do usuário:", error);
      res.status(500).send({ msg: "Erro ao obter pedidos do usuário.", error });
    }
  }
  
  
  async getAllOrders(_: Request, res: Response) {
    try {
      const orders = await prisma.orders.findMany({
        include: {
          userOrder: {
            select: {
              username: true,
              useraddress: true,
            },
          },
          OrderItems: {
            include: {
              productOrder: true,
            },
          },
        },
      });

      const formattedOrders = orders.map((order) => ({
        id: order.id,
        user: {
          name: order.userOrder.username,
          address: order.userOrder.useraddress,
        },
        totalPrice: order.totalPrice,
        status: order.orderstatus,
        address: order.userOrder.useraddress,
        createdAt: order.createdAt,
        products: order.OrderItems.map((item) => ({
          productname: item.productOrder.productname,
          orderquantity: item.orderquantity,
          productprice: item.productOrder.productprice,
          productImageUrl: item.productOrder.productImageUrl,
        })),
      }));

      res.status(200).send(formattedOrders);
    } catch (error) {
      console.error("Erro ao obter pedidos:", error);
      res.status(500).send({ msg: "Erro ao obter pedidos.", error: error });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await prisma.orders.update({
        where: { id: Number(id) },
        data: { orderstatus: status },
      });

      res
        .status(200)
        .send({ msg: "Status do pedido atualizado com sucesso.", order });
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      res
        .status(500)
        .send({ msg: "Erro ao atualizar status do pedido.", error: error });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const order = await prisma.orders.delete({
        where: { id: Number(id) },
      });

      res.status(200).send({ msg: "Pedido excluído com sucesso.", order });
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      res.status(500).send({ msg: "Erro ao excluir pedido.", error: error });
    }
  }
}