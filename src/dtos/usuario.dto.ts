import { Usuario } from "@prisma/client";

// Criação do DTO de Criação
export interface CreateUsuarioDto {
  nome: string;
  email: string; 
  username: string; 
  senha: string;
}

// Relacionamento
interface FollowerDto {
  id: string;
  nome: string;
  username: string;
}

// DTO Principal 
export interface UsuarioDto {
  id: string; 
  nome: string; 
  email: string; 
  username: string; 
  status: Usuario; 
  seguidores?: Array<FollowerDto>;
  seguindo?: Array<FollowerDto>;
  createdAt: Date;
  updatedAt: Date; 
}

// DTO para Filtros de Consulta
export interface QueryFilterUsuarioDto {
  nome?: string; 
  email?: string; 
  status?: Usuario;
}

// DTO de Atualização
export interface UpdateUsuarioDto {
  nome?: string; 
  email?: string;
  username?: string;
  senha?: string;
  status?: Usuario;
}
