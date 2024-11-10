import { Request, Response, NextFunction } from "express";

export class CreateTweetMiddleware {
  // Validação dos campos obrigatórios
  public static validateRequired(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) {
    const { conteudo, usuarioId } = req.body;

    if (!conteudo) {
      res.status(400).json({
        ok: false,
        message: "O campo conteudo é obrigatório.",
      });
      return;
    }

    if (!usuarioId) {
      res.status(400).json({
        ok: false,
        message: "O campo usuarioId é obrigatório.",
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
    const { conteudo, tipo, usuarioId } = req.body;

    if (typeof conteudo !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo 'conteudo' deve ser uma string.",
      });
      return;
    }

    if (tipo && typeof tipo !== "string") {
      res.status(400).json({
        ok: false,
        message: "O campo tipo deve ser uma string.",
      });
      return;
    }

    if (tipo && !['Tweet', 'Reply'].includes(tipo)) {
        res.status(400).json({
          ok: false,
          message: "O campo tipo deve ser Tweet ou Reply.",
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