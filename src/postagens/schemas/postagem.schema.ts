import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IPostagem } from './models/postagem.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostagemDocument = HydratedDocument<Postagem>;

@Schema()
export class Postagem implements IPostagem {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  disciplina: string;
  @Prop()
  turma: string;
  @Prop()
  titulo: string;
  @Prop()
  conteudo: string;
  @Prop()
  autor: string;
  @Prop()
  createdAt: Date;
}

export const PostagemSchema = SchemaFactory.createForClass(Postagem);
