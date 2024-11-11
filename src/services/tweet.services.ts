// Importações Necessárias
import { Tweet, TweetTipo, Usuario } from "@prisma/client";
import { prisma } from "../database/prisma.database";
import { CreateTweetDto } from "../dtos/tweet.dto";
import { ResponseApi } from "../Types";
import { AuthService } from "./auth.services";

export class TweetService {
  remove: any;
  update: any;
  findOneById: any;
  findAll: any;
  public async createTweet(createTweetDto: CreateTweetDto, usuarioId: string): Promise<ResponseApi> {
    // Verificar se o usuário está autenticado
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });

    if (!usuario) {
      return {
        ok: false,
        code: 401,
        message: "Usuário não autenticado!",
      };
    }

    const { conteudo, tipo } = createTweetDto;

    // Criação do tweet
    const tweetCriado = await prisma.tweet.create({
      data: {
        conteudo,
        tipo: tipo || TweetTipo.Tweet, 
        usuarioId, 
      },
    });

    return {
      ok: true,
      code: 201,
      message: "Tweet criado com sucesso!",
      data: this.mapTweetToDto(tweetCriado),
    };
  }

  public async findTweetsByUsuario(usuarioId: string, query?: { page?: number; take?: number }): Promise<ResponseApi> {
    // Verificar se o usuário está autenticado
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });

    if (!usuario) {
      return {
        ok: false,
        code: 401,
        message: "Usuário não autenticado!",
      };
    }

    // Paginação dos tweets
    const tweets = await prisma.tweet.findMany({
      where: { usuarioId },
      skip: query?.page,
      take: query?.take,
      orderBy: { createdAt: "desc" },
    });

    if (tweets.length === 0) {
      return {
        ok: false,
        code: 404,
        message: "Nenhum tweet encontrado para o usuário fornecido.",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Tweets encontrados com sucesso!",
      data: tweets.map((tweet) => this.mapTweetToDto(tweet)),
    };
  }

  public async removeTweet(tweetId: string, usuarioId: string): Promise<ResponseApi> {
    // Verificar se o usuário está autenticado
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });

    if (!usuario) {
      return {
        ok: false,
        code: 401,
        message: "Usuário não autenticado!", 
      };
    }

    const tweet = await prisma.tweet.findUnique({
      where: { id: tweetId },
    });

    if (!tweet || tweet.usuarioId !== usuarioId) {
      return {
        ok: false,
        code: 404,
        message: "Tweet não encontrado ou você não tem permissão para removê-lo.",
      };
    }

    // Remover o tweet
    await prisma.tweet.delete({ where: { id: tweetId } });

    return {
      ok: true,
      code: 200,
      message: "Tweet removido com sucesso!",
    };
  }

  private mapTweetToDto(tweet: Tweet): CreateTweetDto {
    return {
      conteudo: tweet.conteudo,
      tipo: tweet.tipo,
      usuarioId: tweet.usuarioId,
    };
  }
}
