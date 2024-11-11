import { Request, Response, NextFunction } from "express";
import { validate as isUuid } from "uuid"; // Certifique-se de ter instalado 'uuid' e '@types/uuid'

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

  // Validação de dados específicos (por exemplo, formato UUID)
  public static validateData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { usuarioId, tweetId } = req.body;

    if (!isUuid(usuarioId)) {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId deve ser um UUID válido.",
      });
      return;
    }

    if (!isUuid(tweetId)) {
      res.status(400).json({
        ok: false,
        message: "O campo tweetId deve ser um UUID válido.",
      });
      return;
    }

    return next();
  }
}


