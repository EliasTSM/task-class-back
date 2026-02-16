import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aluno } from './aluno.schema';

@Injectable()
export class AlunoService {
  constructor(
    @InjectModel(Aluno.name)
    private readonly alunoModel: Model<Aluno>,
  ) {}

  async create(dto: any) {
    return this.alunoModel.create(dto);
  }

  async findAll() {
    return this.alunoModel.find().populate('turmaId');
  }

  async getById(id: string) {
    const aluno = await this.alunoModel.findById(id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return aluno;
  }

  async update(id: string, dto: any) {
    const updated = await this.alunoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Aluno não encontrado');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.alunoModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Aluno não encontrado');
    return { message: 'Aluno removido' };
  }
}