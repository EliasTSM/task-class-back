import { Document, Types } from 'mongoose';

export interface IPostagem extends Document {
  id?: string;
  disciplina: string;
  turmaId?: Types.ObjectId;
  titulo: string;
  conteudo: string;
  professorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
