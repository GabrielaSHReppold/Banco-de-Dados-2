import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services";

export class AuthMiddleware {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization; 

    if (!token) {
      res.status(401).json({
        ok: false,
        message: "Não autenticado!",
      });
      return;
    }

    const service = new AuthService();
    const usuarioFound = await service.validateToken(token);

    if (!usuarioFound) {
      res.status(401).json({
        ok: false,
        message: "Não autenticado!",
      });
      return;
    }

    // Repassa essa informação.
    req.body.student = {
      id: usuarioFound.id,
      type: usuarioFound.type,
    };

    req.body.outro = "DEU BOM";

    next();
  }
}
