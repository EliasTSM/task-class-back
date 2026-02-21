import { Document, Types } from 'mongoose';

export interface IProfessor extends Document {
  userId: string;
  materias: string[];
  turmas: Types.ObjectId[];
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}