import { Document, Types } from 'mongoose';

export interface ITurma extends Document {
  nome: string;
  ano: number;

  professorId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}