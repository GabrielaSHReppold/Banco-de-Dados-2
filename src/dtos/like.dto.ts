import { like } from "@prisma/client";

// Criação do DTO de Criação
export interface CreateLikeDto {
  usuarioId: string; 
  tweetId: string; 
}

// Relacionamento 
interface UsuarioDto {
  id: string;
  name: string;
  email: string;
}

// Relacionamento
interface TweetDto {
  id: string;
  content: string;
  authorId: string;
}

export interface LikeDto {
  id: string; 
  usuarioId: string;
  tweetId: string; 
  createdAt: Date; 
  usuario?: UsuarioDto; 
  tweet?: TweetDto; 
}

// DTO para Filtros de Consulta
export interface QueryFilterLikeDto {
  usuarioId?: string; 
  tweetId?: string; 
}

// DTO de Atualização
export interface UpdateLikeDto {
  usuarioId?: string; 
  tweetId?: string; 
}
