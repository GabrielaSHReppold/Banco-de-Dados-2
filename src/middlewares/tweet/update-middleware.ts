import { Request, Response, NextFunction } from "express";

export class UpdateTweetMiddleware {
  // Validação dos tipos de dados
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { conteudo, tipo, usuarioId } = req.body;

    if (conteudo && typeof conteudo !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo conteudo deve ser uma string.",
      });
      return;
    }

    if (tipo && tipo !== 'Tweet' && tipo !== 'Reply') {
      res.status(400).json({
        ok: false,
        message: "O campo tipo deve ser Tweet ou Reply.",
      });
      return;
    }

    if (usuarioId && typeof usuarioId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId deve ser uma string.",
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
    const { conteudo } = req.body;

    if (conteudo && (conteudo.length < 10 || conteudo.length > 700)) {
      res.status(400).json({
        ok: false,
        message: "O campo conteudo deve conter entre 10 e 700 caracteres.",
      });
      return;
    }

    return next(); 
  }
}