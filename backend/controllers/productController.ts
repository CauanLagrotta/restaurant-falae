import { Request, Response } from "express";
import { prisma } from "../db/database";

export class ProductController {
  async create(req: Request, res: Response) {
    const {
      productname,
      productprice,
      productcategory,
      productdescription,
      productImageUrl,
    } = req.body;

    if (!productname || !productprice || !productcategory) {
      return res
        .status(400)
        .send({ msg: "Nome, preço e categoria são obrigatórios!" });
    }

    const price = parseFloat(productprice);

    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .send({ msg: "Preço inválido! Deve ser maior que 0." });
    }

    await prisma.product.create({
      data: {
        productname: productname,
        productprice: price,
        productcategory: productcategory,
        productdescription: productdescription,
        productImageUrl: productImageUrl,
      },
    });

    return res.status(201).json({ msg: "Produto criado com sucesso!" });
  }

  async productAll(_: Request, res: Response) {
    const products = await prisma.product.findMany();

    return res.status(200).json(products);
  }

  async productById(req: Request, res: Response) {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    return res.status(200).json(product);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const {
      productname,
      productprice,
      productcategory,
      productdescription,
      productImageUrl,
    } = req.body;

    const price = parseFloat(productprice);

    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .send({ msg: "Preço inválido! Deve ser maior que 0." });
    }

    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        productname,
        productprice: price,
        productcategory,
        productdescription,
        productImageUrl,
      },
    });

    return res.status(200).json({ msg: "Produto atualizado com sucesso!" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.orderItem.deleteMany({
      where: {
        productId: Number(id),
      },
    });

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ msg: "Produto excluído com sucesso!" });
  }
}
