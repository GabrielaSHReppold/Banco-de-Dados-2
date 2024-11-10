import { Request, Response } from "express";
import { TweetDto } from "../dtos/tweet.dto";
import { TweetService } from "../services/tweet.services";
import { UpdateTweetDto } from "../dtos/tweet.dto";

export class TweetController {
  // Criação
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { conteudo, tipo, usuarioId } = req.body;

      const data: CreateTweetDto = {
        conteudo,
        tipo,
        usuarioId,
      };

      const service = new TweetService();
      const result = await service.create(data);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  // Listar (findAll)
  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { page, take } = req.query;

      const service = new TweetService();
      const result = await service.findAll({
        page: page ? Number(page) - 1 : undefined,
        take: take ? Number(take) : undefined,
      });

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  // Buscar (findOneById)
  public static async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new TweetService();
      const result = await service.findOneById(id);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  // Atualização
  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { conteudo, tipo } = req.body;

      const data: UpdateTweetDto = {
        conteudo,
        tipo,
      };

      const service = new TweetService();
      const result = await service.update(id, data);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  // Remover
  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new TweetService();
      const result = await service.remove(id);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }
}
