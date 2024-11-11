import { TweetTipo } from "@prisma/client"; 
// Criação do DTO de Criação
export interface CreateTweetDto {
  conteudo: string; 
  tipo: TweetTipo; 
  usuarioId: string;
}

// Relacionamento
interface UsuarioDto {
  id: string;
  nome: string;
  email: string;
}

// Relacionamento
interface ReplyDto {
  id: string;
  conteudo: string;
  usuarioId: string;
  createdAt: Date;
}

export interface TweetDto {
  id: string; 
  conteudo: string; 
  tipo: TweetDto; 
  usuarioId: string; 
  createdAt: Date; 
  updatedAt: Date; 
  usuario?: UsuarioDto;
  respostas?: Array<ReplyDto>;
}

// DTO para Filtros de Consulta
export interface QueryFilterTweetDto {
  usuarioId?: string; 
  tipo?: TweetDto;
}

// DTO de Atualização
export interface UpdateTweetDto {
  conteudo?: string;
  tipo?: TweetDto;
}
