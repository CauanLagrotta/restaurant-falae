import { Request, Response } from "express";
import { prisma } from "../db/database";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateResetToken } from "./resetpasswordController";
dotenv.config();

export class ForgotPasswordController {
  async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { useremail } = req.body;

      if (!useremail) {
        return res.status(400).json({ msg: "O campo de email é obrigatório." });
      }

      const user = await prisma.users.findUnique({
        where: { useremail },
      });

      if (!user) {
        return res.status(404).json({ msg: "Email não encontrado." });
      }

      const resetToken = generateResetToken(useremail, user.id);
      const resetURL = `http://localhost:5173/api/auth/reset-password/${user.id}/${resetToken}`;

      const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST,
        port: Number(process.env.BREVO_SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.BREVO_SMTP_USER,
          pass: process.env.BREVO_SMTP_PASS,
        },
      });

      await transporter.verify();

      const mailOptions = {
        from: "cauanlagrotta.dev@gmail.com",
        to: useremail,
        subject: "Redefinição de senha",
        text: `Você solicitou para redefinir sua senha. Clique no link abaixo para redefinir sua senha: ${resetURL}`,
        html: `<p>Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: <a href="${resetURL}">${resetURL}</a></p>`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        msg: "Email para redefinição de senha enviado com sucesso.",
      });
    } catch (error) {
      console.error(
        "Erro ao enviar email de restabelecimento de senha:",
        error
      );
      return res.status(500).json({
        msg: "Erro ao enviar email de restabelecimento de senha.",
      });
    }
  }
}
