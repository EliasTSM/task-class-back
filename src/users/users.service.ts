import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async createIfNotExists(payload: {
    email: string;
    passwordHash: string;
    role: UserRole;
  }) {
    const existing = await this.findByEmail(payload.email);
    if (existing) return existing;
    return this.userModel.create(payload);
  }
}
