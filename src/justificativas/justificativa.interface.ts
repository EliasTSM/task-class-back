import { Document, Types } from 'mongoose';

export interface IJustificativa extends Document {
  presencaId: Types.ObjectId;
  alunoId: Types.ObjectId;
  motivo: string;
  arquivoUrl?: string;
  aprovado: boolean;
  createdAt: Date;
  updatedAt: Date;
}