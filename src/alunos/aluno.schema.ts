import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Aluno {

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  matricula: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Turma' })
  turmaId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  responsavelId: string;
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);