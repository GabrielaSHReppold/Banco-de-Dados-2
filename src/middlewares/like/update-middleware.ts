import { TweetTipo } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export class UpdateLikeMiddleware {
  // Validação dos tipos de dados
  public static validateTypes(
    req: Request, 
    res: Response, 
    next: NextFunction
    ): void {
    const { usuarioId, tweetId, TweetTipo } = req.body;

    if (
      TweetTipo &&
      TweetTipo !==  TweetTipo.Reply &&
      TweetTipo !==  TweetTipo.Tweet
      ) {
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

    if (tweetId && typeof tweetId !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo tweetId deve ser uma string.",
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
    const { usuarioId, tweetId } = req.body;

    if (usuarioId && usuarioId.length < 3) {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId deve conter pelo menos 3 caracteres.",
      });
      return;
    }

    if (tweetId && tweetId.length < 3) {
      res.status(400).json({
        ok: false,
        message: "O campo tweetId deve conter pelo menos 3 caracteres.",
      });
      return;
    }

    return next();
  }
}