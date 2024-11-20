import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/database";
import { DecodedToken } from "../@types/types";
dotenv.config();

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Autenticação inválida: token não encontrado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN as string) as DecodedToken;

    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        staff: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ msg: "Autenticação inválida: token inválido" });
  }
};
