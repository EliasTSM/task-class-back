import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Justificativa {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Presenca', required: true })
  presencaId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true })
  alunoId: string;

  @Prop({ required: true })
  motivo: string;

  @Prop()
  arquivoUrl: string;

  @Prop({ default: false })
  aprovado: boolean;
}

export const JustificativaSchema = SchemaFactory.createForClass(Justificativa);