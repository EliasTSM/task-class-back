import { Document, Types } from 'mongoose';

export interface IJustificativa extends Document {
  alunoId: Types.ObjectId;
  responsavelId: Types.ObjectId;

  motivo: string;
  arquivoUrl?: string;

  aprovado: boolean;

  createdAt: Date;
  updatedAt: Date;
}