import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor } from './professor.schema';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectModel(Professor.name)
    private readonly professorModel: Model<Professor>,
  ) {}

  async create(dto: any) {
    const professor = await this.professorModel.create(dto);
    return professor;
  }

  async getAll() {
    return this.professorModel.find();
  }

  async getById(id: string) {
    const professor = await this.professorModel.findById(id);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    return professor;
  }

  async update(id: string, dto: any) {
    const updated = await this.professorModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Professor não encontrado');
    }

    return updated;
  }

  async delete(id: string) {
    const deleted = await this.professorModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Professor não encontrado');
    }

    return { message: 'Professor removido com sucesso' };
  }
}