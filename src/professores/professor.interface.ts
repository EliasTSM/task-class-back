import { Document, Types } from 'mongoose';
import { UserRole } from '../common/enums/user-role.enum';

export interface IProfessor extends Document {
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;

  materias: string[]; // Ex: ["Matemática", "Física"]

  turmas: Types.ObjectId[]; // Referência às turmas

  role: UserRole; // PROFESSOR

  ativo: boolean;

  createdAt: Date;
  updatedAt: Date;
}