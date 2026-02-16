import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async getAll() {
    return this.userModel.find().select('-senha');
  }

  async getById(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-senha');

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(data: IUser) {
    const exists = await this.userModel.findOne({ email: data.email });

    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const newUser = new this.userModel({
      ...data,
      senha: hashedPassword,
    });

    return newUser.save();
  }

  async update(id: string, data: Partial<IUser>) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    const updated = await this.userModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    ).select('-senha');

    if (!updated) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return updated;
  }

  async delete(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return { message: 'Usuário removido com sucesso' };
  }

  async createIfNotExists(data: {
    nome: string;
    email: string;
    senha: string;
    role: UserRole;
  }) {
    const exists = await this.userModel.findOne({ email: data.email });
  
    if (!exists) {
      await this.userModel.create(data);
    }
  }
}