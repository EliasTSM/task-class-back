import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Turma {

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  ano: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' })
  professorId: string;
}

export const TurmaSchema = SchemaFactory.createForClass(Turma);