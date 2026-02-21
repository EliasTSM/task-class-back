import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPostagem } from './postagem.interface';

@Injectable()
export class PostagemService {
  constructor(
    @InjectModel('Postagem')
    private readonly postagemModel: Model<IPostagem>,
  ) {}

  async getAllPostagens(limit = 10, page = 1) {
    const skip = (page - 1) * limit;

    const data = this.postagemModel
      .find()
      .populate('professorId')
      .populate('turmaId')
      .limit(limit)
      .skip(skip);

    const total = await this.postagemModel.countDocuments();

    return { data, total, page, limit };
  }

  async getAllPostagensSearch(search: string) {
    const query = {
      $or: [
        { titulo: { $regex: search, $options: 'i' } },
        { conteudo: { $regex: search, $options: 'i' } },
      ],
    };

    return this.postagemModel
        .find(query)
        .populate('professorId')
        .populate('turmaId');
  }

  async getPostagemById(postagemId: string) {
    const postagem = await this.postagemModel
        .findById(postagemId)
        .populate('professorId')
        .populate('turmaId');

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada');
    }

    return postagem;
  }

  async createPostagem(postagem: IPostagem) {
    const novaPostagem = new this.postagemModel({
        ...postagem,
        professorId: new Types.ObjectId(postagem.professorId),
        turmaId: new Types.ObjectId(postagem.turmaId),
    });
    return novaPostagem.save();
  }

  async updatePostagem(postagemId: string, postagem: Partial<IPostagem>) {
    const postagemAtualizada =
      await this.postagemModel.findByIdAndUpdate(
        postagemId,
        postagem,
        { new: true },
      );

    if (!postagemAtualizada) {
      throw new NotFoundException('Postagem não encontrada');
    }

    return postagemAtualizada;
  }

  async deletePostagem(postagemId: string) {
    const postagem =
      await this.postagemModel.findByIdAndDelete(postagemId);

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada');
    }

    return { message: 'Postagem deletada com sucesso' };
  }
}