import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum StatusPresenca {
  PRESENTE = 'presente',
  FALTA = 'falta',
}

@Schema({ timestamps: true })
export class Presenca {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true })
  alunoId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true })
  turmaId: string;

  @Prop({ required: true })
  data: Date;

  @Prop({ enum: StatusPresenca, required: true })
  status: StatusPresenca;

  @Prop()
  observacao: string;
}

export const PresencaSchema = SchemaFactory.createForClass(Presenca);