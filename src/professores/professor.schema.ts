import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../common/enums/user-role.enum';

export type ProfessorDocument = Professor & Document;

@Schema({ timestamps: true })
export class Professor {

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop()
  telefone?: string;

  @Prop({ type: [String], required: true })
  materias: string[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Turma' }],
    default: [],
  })
  turmas: Types.ObjectId[];

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.PROFESSOR,
  })
  role: UserRole;

  @Prop({ default: true })
  ativo: boolean;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);