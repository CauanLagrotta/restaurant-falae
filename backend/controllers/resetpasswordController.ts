import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import express from "express";
import { prisma } from "../db/database";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const generateResetToken = (useremail: string, id: number): string => {
  const payload = { useremail, id };
  const options = { expiresIn: "1d" };
  const secret = process.env.TOKEN;
  if (!secret) {
    throw new Error("Token secret is not defined in the environment variables.");
  }
  return jwt.sign(payload, secret, options);
};

export class ResetPasswordController {
  static generateResetToken(useremail: string, id: number): string {
    const payload = { useremail, id };
    const options = { expiresIn: "1d" };
    const secret = process.env.TOKEN!;
    return jwt.sign(payload, secret, options);
  }

  async getResetPassword(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const { userid, token } = req.params;
      const secret = process.env.TOKEN!;

      const payload = jwt.verify(token, secret) as jwt.JwtPayload;
      if (payload.id !== parseInt(userid, 10)) {
        return res.status(401).json({ msg: "Autenticação inválida" });
      }

      const frontendUrl = `http://localhost:5173/api/auth/reset-password/${userid}/${token}`;
      return res.redirect(frontendUrl) as unknown as express.Response;
    } catch (err) {
      console.log("Erro ao verificar token:", err);
      return res.status(401).json({ msg: "Token inválido" });
    }
  }

  async postResetPassword(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const { userid, token } = req.params;
      const { userpassword } = req.body;
      const secret = process.env.TOKEN!;

      const payload = jwt.verify(token, secret) as jwt.JwtPayload;
      if (payload.id !== parseInt(userid, 10)) {
        return res.status(401).json({ msg: "Autenticação inválida" });
      }

      const user = await prisma.users.findUnique({
        where: { id: Number(userid) },
      });

      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      const isSamePassword = await bcrypt.compare(userpassword, user.userpassword);
      if (isSamePassword) {
        return res.status(400).json({ msg: "A nova senha não pode ser igual à senha anterior" });
      }

      const hashedPassword = await bcrypt.hash(userpassword, saltRounds);

      await prisma.users.update({
        where: { id: Number(userid) },
        data: { userpassword: hashedPassword },
      });

      return res.status(200).json({ msg: "Senha alterada com sucesso!" });
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      return res.status(500).json({ msg: "Erro ao redefinir senha" });
    }
  }
}
