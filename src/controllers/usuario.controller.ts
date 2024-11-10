import { Request, Response } from "express";
import { CreateUsuarioDto } from "../dtos/usuario.dto";
import { UsuarioService } from "../services/usuario.services";
import { UpdateUsuarioDto } from "../dtos/usuario.dto";
import { Usuario } from "@prisma/client"; 


export class UsuarioController {
  // Criação
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, username, senha } = req.body;

      const data: CreateUsuarioDto = { 
        nome,
        email,
        username,
        senha,
      };

      const service = new UsuarioService();
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

      const service = new UsuarioService();
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

      const service = new UsuarioService();
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
      const { nome, email, username, senha } = req.body;

      const service = new UsuarioService();
      const result = await service.update(id, { nome, email, username, senha });

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

      const service = new UsuarioService();
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
