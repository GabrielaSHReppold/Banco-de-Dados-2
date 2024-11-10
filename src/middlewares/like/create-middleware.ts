import { Request, Response, NextFunction } from "express";

export class CreateLikeMiddleware {
  // Validação dos campos obrigatórios
  public static validateRequired(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) {
    const { usuarioId, tweetId } = req.body;

    if (!usuarioId) {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId é obrigatório.",
      });
      return;
    }

    if (!tweetId) {
      res.status(400).json({
        ok: false,
        message: "O campo tweetId é obrigatório.",
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
    const { usuarioId, tweetId } = req.body;

    if (typeof usuarioId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId deve ser uma string.",
      });
      return;
    }

    if (typeof tweetId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo tweetId deve ser uma string.",
      });
      return;
    }

    return next();
  }
}