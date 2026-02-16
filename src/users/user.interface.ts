import { Document } from 'mongoose';
import { UserRole } from '../common/enums/user-role.enum';

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}