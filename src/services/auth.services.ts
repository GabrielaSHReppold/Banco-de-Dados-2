import { randomUUID } from "crypto";
import { prisma } from "../database/prisma.database";
import { LoginDto } from "../dtos";
import { ResponseApi } from "../Types";
import { Bcrypt } from "../utils/bcrypt";

export class AuthService {
  public async login(data: LoginDto): Promise<ResponseApi> {
    const { email, senha: senhaRecebida } = data;

    // 1 - Verificar o email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return {
        ok: false,
        code: 404,
        message: "E-mail incorreto.",
      };
    }

    // 2 - Verificar a senha (hash - bcrypt)
    const hash = usuario.senha;

    // Verificar se o hash é nulo
    if (!hash) {
      return {
        ok: false,
        code: 400,
        message: "Senha não encontrada.",
      };
    }

    const bcrypt = new Bcrypt();
    const isPasswordValid = await bcrypt.verify(senhaRecebida, hash);

    if (!isPasswordValid) {
      return {
        ok: false,
        code: 404,
        message: "Senha incorreta.",
      };
    }

    // 3 - Gerar o token (uid)
    const token = randomUUID();

    // 4 - Atualizar a coluna authToken
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        authToken: token,
      },
    });

    // 5 - Feed de sucesso retornando o token (uid)
    return {
      ok: true,
      code: 200,
      message: "Login efetuado com sucesso!",
      data: { token },
    };
  }

  public async validateToken(token: string): Promise<ResponseApi> {
    const usuario = await prisma.usuario.findFirst({
      where: { authToken: token },
    });

    if (!usuario) {
      return {
        ok: false,
        code: 404,
        message: "Token inválido.",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Token válido.",
      data: usuario,
    };
  }
}
