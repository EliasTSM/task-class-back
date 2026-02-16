import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IJustificativa } from './justificativa.interface';

@Injectable()
export class JustificativaService {
  constructor(
    @InjectModel('Justificativa')
    private readonly justificativaModel: Model<IJustificativa>,
  ) {}

  async getAll(limit = 10, page = 1) {
    const skip = (page - 1) * limit;

    const data = await this.justificativaModel
      .find()
      .populate('alunoId')
      .populate('responsavelId')
      .limit(limit)
      .skip(skip);

    const total = await this.justificativaModel.countDocuments();

    return { data, total, page, limit };
  }

  async getByAluno(alunoId: string) {
    return this.justificativaModel
      .find({ alunoId })
      .populate('responsavelId');
  }

  async getById(id: string) {
    const justificativa = await this.justificativaModel
      .findById(id)
      .populate('alunoId')
      .populate('responsavelId');

    if (!justificativa) {
      throw new NotFoundException('Justificativa não encontrada');
    }

    return justificativa;
  }

  async create(data: IJustificativa) {
    const newJustificativa = new this.justificativaModel({
      ...data,
      alunoId: new Types.ObjectId(data.alunoId),
      responsavelId: new Types.ObjectId(data.responsavelId),
      aprovado: false,
    });

    return newJustificativa.save();
  }

  async aprovar(id: string) {
    const updated = await this.justificativaModel.findByIdAndUpdate(
      id,
      { aprovado: true },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Justificativa não encontrada');
    }

    return updated;
  }

  async reprovar(id: string) {
    const updated = await this.justificativaModel.findByIdAndUpdate(
      id,
      { aprovado: false },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Justificativa não encontrada');
    }

    return updated;
  }

  async delete(id: string) {
    const deleted = await this.justificativaModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Justificativa não encontrada');
    }

    return { message: 'Justificativa removida com sucesso' };
  }
}