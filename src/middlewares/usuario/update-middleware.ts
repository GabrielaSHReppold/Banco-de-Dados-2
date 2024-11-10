
import { Request, Response, NextFunction } from "express";
import { Usuario } from "@prisma/client"; 

export class UpdateUsuarioMiddleware {
  // Validação dos tipos de dados
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { nome, email, username, senha } = req.body;

    if (nome && typeof nome !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo nome deve ser uma string.",
      });
      return;
    }

    if (email && typeof email !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo email deve ser uma string.",
      });
      return;
    }

    if (username && typeof username !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo username deve ser uma string.",
      });
      return;
    }

    if (senha && typeof senha !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo senha deve ser uma string.",
      });
      return;
    }

    return next();
  }

  // Validação de conteúdo dos campos
  public static validateData(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { nome, email, senha } = req.body;

    if (nome && nome.length < 3) {
      res.status(400).json({
        ok: false,
        message: "O campo nome deve conter pelo menos 3 caracteres.",
      });
      return;
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
      res.status(400).json({
        ok: false,
        message: "O campo email deve ser um e-mail válido.",
      });
      return;
    }

    if (senha && senha.length < 6) {
      res.status(400).json({
        ok: false,
        message: "O campo senha deve conter pelo menos 6 caracteres.",
      });
      return;
    }

    return next();
  }
}
