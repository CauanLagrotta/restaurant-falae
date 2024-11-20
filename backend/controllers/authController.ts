import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../db/database";


export class AuthController { 
  async login(req: Request, res: Response) {
    const { useremail, userpassword } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        useremail,
      },
    });
    console.log(user);

    if (!user) {
      return res.status(401).send({ msg: "Email ou senha incorretos" });
    }

    const passwordMatch = await bcrypt.compare(userpassword, user.userpassword);
    if (!passwordMatch) {
      return res.status(401).send({ msg: "Email ou senha incorretos" });
    }

    const accessToken = jwt.sign({ id: user.id, staff: user.staff }, process.env.TOKEN as any, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      msg: "Login efetuado com sucesso",
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        useremail: user.useremail,
        staff: user.staff
      },
    });
  }

  async verifyUser(req: Request, res: Response) {
    return res.status(200).send({ msg: "Autenticação bem-sucedida", user: req.user });
  }

  async logout(_: Request, res: Response) {
    res.clearCookie("token");
    return res.status(200).send({ msg: "Logout efetuado com sucesso" });
  }
  
}
