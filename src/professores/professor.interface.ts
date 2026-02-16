import { Document, Types } from 'mongoose';
import { UserRole } from '../common/enums/user-role.enum';

export interface IProfessor extends Document {
  userId: string;
  materias: string[];
  turmas: Types.ObjectId[];
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}