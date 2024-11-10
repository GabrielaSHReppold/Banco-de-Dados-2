import { Request, Response, NextFunction } from "express";

export class FindAllLikesMiddleware {
  // Validação dos tipos
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { usuarioId, tweetId } = req.query;

    if (usuarioId && typeof usuarioId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId deve ser uma string.",
      });
      return;
    }

    if (tweetId && typeof tweetId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo tweetId deve ser uma string.",
      });
      return;
    }

    return next();
  }
}