import { prisma } from "../database/prisma.database";
import { CreateUsuarioDto, UpdateUsuarioDto } from "../dtos/usuario.dto";
import { ResponseApi } from "../Types";
import { Usuario } from "@prisma/client";

export class UsuarioService {

 public async create(createUsuarioDto: CreateUsuarioDto): Promise<ResponseApi> {
   const { nome, email, username, senha } = createUsuarioDto;

   // Verificar se o e-mail ou username já existem
   const usuarioExistente = await prisma.usuario.findFirst({
     where: {
       OR: [{ email }, { username }],
     },
   });

   if (usuarioExistente) {
     return {
       ok: false,
       code: 409,
       message: "E-mail ou username já estão em uso!",
     };
   }

   // Criação do usuário no banco de dados
   const usuarioCriado = await prisma.usuario.create({
     data: { nome, email, username, senha },
   });

   return {
     ok: true,
     code: 201,
     message: "Usuário criado com sucesso!",
     data: this.mapToDto(usuarioCriado),
   };
 }

 public async findAll(query?: { page?: number; take?: number }): Promise<ResponseApi> {
   const usuarios = await prisma.usuario.findMany({
     skip: query?.page,
     take: query?.take,
     orderBy: { createdAt: "asc" },
   });

   if (!usuarios || usuarios.length === 0) {
     return {
       ok: false,
       code: 404,
       message: "Nenhum usuário encontrado",
     };
   }

   return {
     ok: true,
     code: 200,
     message: "Usuários buscados com sucesso!",
     data: usuarios.map((usuario) => this.mapToDto(usuario)),
   };
 }

 public async findOneById(id: string): Promise<ResponseApi> {
   const usuario = await prisma.usuario.findUnique({
     where: { id },
   });

   if (!usuario) {
     return {
       ok: false,
       code: 404,
       message: "Usuário não encontrado",
     };
   }

   return {
     ok: true,
     code: 200,
     message: "Usuário encontrado com sucesso!",
     data: this.mapToDto(usuario),
   };
 }

 public async followUser(followerId: string, followedId: string): Promise<ResponseApi> {
   // Verificar se o usuário está tentando seguir a si mesmo
   if (followerId === followedId) {
     return {
       ok: false,
       code: 400,
       message: "Um usuário não pode seguir a si mesmo!",
     };
   }

   // Verificar se (seguidor e seguido) existem
   const follower = await prisma.usuario.findUnique({ where: { id: followerId } });
   const followed = await prisma.usuario.findUnique({ where: { id: followedId } });

   if (!follower || !followed) {
     return {
       ok: false,
       code: 404,
       message: "Usuário seguidor ou seguido não encontrado!",
     };
   }

   // Usuário pode seguir outro usuário
   await prisma.follower.create({
     data: {
       followerId,
       followedId,
     },
   });

   return {
     ok: true,
     code: 201,
     message: "Usuário seguido com sucesso!",
   };
 }

 public async unfollowUser(followerId: string, followedId: string): Promise<ResponseApi> {
   const existingFollow = await prisma.follower.findFirst({
     where: { followerId, followedId },
   });

   if (!existingFollow) {
     return {
       ok: false,
       code: 404,
       message: "Relação de seguidor não encontrada!",
     };
   }

   // Remover seguidor
   await prisma.follower.delete({
     where: { id: existingFollow.id },
   });

   return {
     ok: true,
     code: 200,
     message: "Usuário deixou de seguir com sucesso!",
   };
 }

 private mapToDto(usuario: Usuario): CreateUsuarioDto {
   return {
     id: usuario.id,
     nome: usuario.nome,
     email: usuario.email,
     username: usuario.username,
     senha: usuario.senha,
   };
 }

 public async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<ResponseApi> {
   const { nome, email, username, senha } = updateUsuarioDto;
    // Verificar se o usuário existe
   const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
   if (!usuarioExistente) {
     return {
       ok: false,
       code: 404,
       message: "Usuário não encontrado",
     };
   }
    // Atualizar o usuário
   const usuarioAtualizado = await prisma.usuario.update({
     where: { id },
     data: { nome, email, username, senha },
   });
    return {
     ok: true,
     code: 200,
     message: "Usuário atualizado com sucesso!",
     data: this.mapToDto(usuarioAtualizado),
   };
 }

 public async remove(id: string): Promise<ResponseApi> {
   // Verificar se o usuário existe
   const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
   if (!usuarioExistente) {
     return {
       ok: false,
       code: 404,
       message: "Usuário não encontrado",
     };
   }
    // Remover o usuário
   await prisma.usuario.delete({ where: { id } });
    return {
     ok: true,
     code: 200,
     message: "Usuário removido com sucesso!",
   };
 } 

 // Mapeamento do DTO
 private mapToDto(usuario: Usuario){
  return {
    nome: usuario.nome,
    email: usuario.email,
    username: usuario.username,
    senha: usuario.senha ?? "",
    };
  }
}
interface UpdateDTO {
  nome: usuario.nome,
  email: usuario.email,
  username: usuario.username,
  senha: usuario.senha ?? "",
}




