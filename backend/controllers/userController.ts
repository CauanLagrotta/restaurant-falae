import { prisma } from "../db/database";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const saltRounds = 10;

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username, useremail, userphone, userpassword, useraddress } =
        req.body;
      const defaultStaffValue = 0;

      const userExists = await prisma.users.findUnique({
        where: {
          useremail,
        },
      });

      if (userExists) {
        return res
          .status(400)
          .json({ msg: "O email informado já foi cadastrado." });
      }

      const hashedPassword = await bcrypt.hash(userpassword, saltRounds);

      await prisma.users.create({
        data: {
          username,
          useremail,
          userphone,
          userpassword: hashedPassword,
          useraddress,
          staff: defaultStaffValue,
        },
      });

      return res.status(201).json({ msg: "Cadastrado com sucesso!" });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return res.status(500).json({ msg: "Erro interno do servidor." });
    }
  }

  async getUsers(_: Request, res: Response) {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          username: true,
          useremail: true,
          userphone: true,
          userpassword: true,
          useraddress: true,
          staff: true,
        },
      });

      return res.status(200).send(users);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).send({ msg: "Erro interno do servidor." });
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, useremail, userphone, useraddress, staff } =
        req.body;

      await prisma.users.update({
        where: { id: Number(id) },
        data: {
          username,
          useremail,
          userphone,
          useraddress,
          staff,
        },
      });

      return res.status(200).send({ msg: "Usuário editado com sucesso!" });
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      return res.status(500).send({ msg: "Erro interno do servidor." });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.users.delete({
        where: { id: Number(id) },
      });

      return res.status(200).send({ msg: "Usuário excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      return res.status(500).send({ msg: "Erro interno do servidor." });
    }
  }
}
