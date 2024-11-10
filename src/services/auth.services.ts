import { randomUUID } from "crypto";
import { prisma } from "../database/prisma.database";
import { LoginDto } from "../dtos";
import { ResponseApi } from "../types";
import { Bcrypt } from "../utils/bcrypt";

export class AuthService {
  public async login(data: LoginDto): Promise<ResponseApi> {
    const { email, senha } = data;

    // 1 - Verificar o email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return {
        ok: false,
        code: 404,
        message: "E-mail incorretos.",
      };
    }

    // 2 - Verficar a senha (hash - bcrypt)
    const hash = usuario.senha;
    const bcrypt = new Bcrypt();
    const isValidPassword = await bcrypt.verify(senha, hash);

    if (!senha) {
      return {
        ok: false,
        code: 404,
        message: "Senha incorretos.",
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

    return usuario;
  }
}
