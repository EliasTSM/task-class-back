import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPresenca } from './presenca.interface';

@Injectable()
export class PresencaService {
  constructor(
    @InjectModel('Presenca')
    private readonly presencaModel: Model<IPresenca>,
  ) {}

  async getAll(limit = 10, page = 1) {
    const skip = (page - 1) * limit;

    const data = await this.presencaModel
      .find()
      .populate('alunoId')
      .populate('turmaId')
      .limit(limit)
      .skip(skip);

    const total = await this.presencaModel.countDocuments();

    return { data, total, page, limit };
  }

  async getByTurma(turmaId: string) {
    return this.presencaModel
      .find({ turmaId })
      .populate('alunoId');
  }

  async getByAluno(alunoId: string) {
    return this.presencaModel
      .find({ alunoId })
      .populate('turmaId');
  }

  async getById(id: string) {
    const presenca = await this.presencaModel
      .findById(id)
      .populate('alunoId')
      .populate('turmaId');

    if (!presenca) {
      throw new NotFoundException('Presença não encontrada');
    }

    return presenca;
  }

  async create(data: IPresenca) {
    const newPresenca = new this.presencaModel({
      ...data,
      alunoId: new Types.ObjectId(data.alunoId),
      turmaId: new Types.ObjectId(data.turmaId),
    });

    return newPresenca.save();
  }

  async update(id: string, data: Partial<IPresenca>) {
    const updated = await this.presencaModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Presença não encontrada');
    }

    return updated;
  }

  async delete(id: string) {
    const deleted = await this.presencaModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Presença não encontrada');
    }

    return { message: 'Presença removida com sucesso' };
  }
}