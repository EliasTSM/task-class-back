import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Postagem {

  @Prop({required: true})
  disciplina: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true})
  turmaId: string;

  @Prop({required: true})
  titulo: string;

  @Prop({required: true})
  conteudo: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true})
  professorId: string;

}

export const PostagemSchema = SchemaFactory.createForClass(Postagem);
