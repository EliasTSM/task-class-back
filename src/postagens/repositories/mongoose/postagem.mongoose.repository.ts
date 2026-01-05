import { IPostagem } from 'src/postagens/schemas/models/postagem.interface';
import { PostagemRepository } from '../postagem.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Postagem } from 'src/postagens/schemas/postagem.schema';
import type { FilterQuery, Model } from 'mongoose';

export class PostagemMongooseRepository implements PostagemRepository {
  constructor(
    @InjectModel(Postagem.name) private postagemModel: Model<Postagem>,
  ) {}

  getAllPostagens(limit: number, page: number): Promise<IPostagem[]> {
    const offset = (page - 1) * limit;
    return this.postagemModel.find().skip(offset).limit(limit).exec();
  }

  getPostagemById(postagemId: string): Promise<IPostagem | null> {
    return this.postagemModel.findById(postagemId).exec();
  }

  async createPostagem(postagem: IPostagem): Promise<void> {
    const createPostagem = new this.postagemModel(postagem);
    await createPostagem.save();
  }

  async updatePostagem(postagemId: string, postagem: IPostagem): Promise<void> {
    await this.postagemModel
      .updateOne(
        { _id: postagemId },
        {
          disciplina: postagem.disciplina,
          turma: postagem.turma,
          titulo: postagem.titulo,
          autor: postagem.autor,
          conteudo: postagem.conteudo,
        },
      )
      .exec();
  }

  async deletePostagem(postagemId: string): Promise<void> {
    await this.postagemModel.deleteOne({ _id: postagemId }).exec();
  }

  searchPostagens(search: FilterQuery<Postagem>): Promise<IPostagem[]> {
    return this.postagemModel.find(search).exec();
  }
}
