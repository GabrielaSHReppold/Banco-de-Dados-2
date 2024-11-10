import { Request, Response, NextFunction } from "express";

export class FindAllTweetsMiddleware {
  // Validação dos tipos
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { usuarioId, tipo } = req.query;

    if (usuarioId && typeof usuarioId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId deve ser uma string.",
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

    return next();
  }
}