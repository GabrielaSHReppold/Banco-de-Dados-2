import { Request, Response, NextFunction } from "express";
import { Usuario } from "@prisma/client"; 

export class FindAllUsuariosMiddleware {
  // Validação dos tipos
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { nome, email, username } = req.query;

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

    return next();
  }
}