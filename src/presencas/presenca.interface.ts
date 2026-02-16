import { Document, Types } from 'mongoose';
import { StatusPresenca } from './presenca.schema';

export interface IPresenca extends Document {
  alunoId: Types.ObjectId;
  turmaId: Types.ObjectId;
  data: Date;
  status: StatusPresenca;
  createdAt: Date;
  updatedAt: Date;
}