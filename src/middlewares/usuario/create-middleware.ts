// Importações básicas do Express
import { Request, Response, NextFunction } from "express";
import { Usuario } from "@prisma/client"; 

export class CreateUsuarioMiddleware {
  // Validação dos campos obrigatórios
  public static validateRequired(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) {
    const { nome, email, username, senha } = req.body;

    if (!nome) {
      res.status(400).json({
        ok: false,
        message: "O campo nome é obrigatório.",
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        ok: false,
        message: "O campo email é obrigatório.",
      });
      return;
    }

    if (!username) {
      res.status(400).json({
        ok: false,
        message: "O campo username é obrigatório.",
      });
      return;
    }

    if (!senha) {
      res.status(400).json({
        ok: false,
        message: "O campo senha é obrigatório.",
      });
      return;
    }

    return next(); 
  }

  // Validação dos tipos de dados
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) {
    const { nome, email, username, senha } = req.body;

    if (typeof nome !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo nome deve ser uma string.",
      });
      return;
    }

    if (typeof email !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo email deve ser uma string.",
      });
      return;
    }

    if (typeof username !== "string") {
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
    ) {
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
        message: "O campo 'senha' deve conter pelo menos 6 caracteres.",
      });
      return;
    }

    return next(); 
  }
}