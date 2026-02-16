import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

export type ProfessorDocument = Professor & Document;

@Schema({ timestamps: true })
export class Professor {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: [String], required: true })
  materias: string[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Turma' }],
    default: [],
  })
  turmas: Types.ObjectId[];

  @Prop({ default: true })
  ativo: boolean;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);