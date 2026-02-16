import { Document } from 'mongoose';

export interface ITurma extends Document {
  nome: string;
  ano: number;
  createdAt: Date;
  updatedAt: Date;
}