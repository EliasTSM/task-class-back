import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ITurma } from './turma.interface';

@Injectable()
export class TurmaService {
  constructor(
    @InjectModel('Turma')
    private readonly turmaModel: Model<ITurma>,
  ) {}

  async getAll(limit = 10, page = 1) {
    const skip = (page - 1) * limit;

    const data = await this.turmaModel
      .find()
      .populate('professorId')
      .limit(limit)
      .skip(skip);

    const total = await this.turmaModel.countDocuments();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getById(id: string) {
    const turma = await this.turmaModel
      .findById(id)
      .populate('professorId');

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    return turma;
  }

  async create(turma: ITurma) {
    const newTurma = new this.turmaModel({
      ...turma,
      professorId: new Types.ObjectId(turma.professorId),
    });

    return newTurma.save();
  }

  async update(id: string, turma: Partial<ITurma>) {
    const updated = await this.turmaModel.findByIdAndUpdate(
      id,
      turma,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Turma não encontrada');
    }

    return updated;
  }

  async delete(id: string) {
    const deleted = await this.turmaModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Turma não encontrada');
    }

    return { message: 'Turma removida com sucesso' };
  }
}