import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../db/database";

const saltRounds = 10;

export class RegisterController {
  async register(req: Request, res: Response) {
    try {
      const { username, useremail, userphone, userpassword, useraddress } = req.body;
      const defaultStaffValue = 0;
  
      const userExists = await prisma.users.findUnique({
        where: {
          useremail,
        },
      });
  
      if (userExists) {
        return res.status(400).json({ msg: "O email informado já foi cadastrado." });
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
}

