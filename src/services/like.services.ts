import { prisma } from "../database/prisma.database";
import { ResponseApi } from "../Types";
import { CreateLikeDto } from "../dtos/like.dto";
import { Like } from "@prisma/client";

export class LikeService {
  


  public async findOneById(id: string): Promise<Like | null> {
    const like = await prisma.like.findUnique({
      where: { id },
    });
    return like;
  }

  public async findAll(params: { page?: number; take?: number }): Promise<Like[]> {
    const { page = 0, take = 10 } = params;
    const likes = await prisma.like.findMany({
      skip: page * take,
      take,
    });
    return likes;
  }

  public async create(data: CreateLikeDto): Promise<Like> {
    const like = await prisma.like.create({
      data,
    });
    return like;
  }

  public async update(id: string, data: { usuarioId: string; tweetId: string }): Promise<Like> {
    const like = await prisma.like.update({
      where: { id },
      data,
    });
    return like;
  }

  public async remove(id: string): Promise<Like> {
    const like = await prisma.like.delete({
      where: { id },
    });
    return like;
  }

  public async likeTweet(usuarioId: string, tweetId: string): Promise<ResponseApi> {
    // Verificar se o usuário está autenticado
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) {
      return {
        ok: false,
        code: 401,
        message: "Usuário não autenticado!", 
      };
    }

    // Verificar se o tweet existe
    const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });
    if (!tweet) {
      return {
        ok: false,
        code: 404,
        message: "Tweet não encontrado!",
      };
    }

    // Verificar se o usuário já curtiu o tweet
    const likeExistente = await prisma.like.findFirst({
      where: { usuarioId, tweetId },
    });
    if (likeExistente) {
      return {
        ok: false,
        code: 409,
        message: "Usuário já curtiu este tweet!", 
      };
    }

    // Criação do like no tweet
    const likeCriado = await prisma.like.create({
      data: {
        usuarioId,
        tweetId,
      },
    });

    return {
      ok: true,
      code: 201,
      message: "Tweet curtido com sucesso!", 
      data: likeCriado,
    };
  }

  public async unlikeTweet(usuarioId: string, tweetId: string): Promise<ResponseApi> {
    // Verificar se o usuário está autenticado
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) {
      return {
        ok: false,
        code: 401,
        message: "Usuário não autenticado!", 
      };
    }

    // Verificar se o like existe
    const likeExistente = await prisma.like.findFirst({
      where: { usuarioId, tweetId },
    });
    if (!likeExistente) {
      return {
        ok: false,
        code: 404,
        message: "Like não encontrado!",
      };
    }

    // Remoção do like
    await prisma.like.delete({ where: { id: likeExistente.id } });

    return {
      ok: true,
      code: 200,
      message: "Like removido com sucesso!", 
    };
  }
}