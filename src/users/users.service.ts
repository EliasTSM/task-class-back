import { Injectable, NotFoundException } from '@nestjs/common';
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

  async listByRole(role: UserRole, limit = 10, page = 1) {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const safePage = Math.max(page, 1);
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      this.userModel
        .find({ role })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .select('_id email role createdAt updatedAt')
        .lean()
        .exec(),
      this.userModel.countDocuments({ role }).exec(),
    ]);

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    };
  }

  async createUser(payload: {
    email: string;
    passwordHash: string;
    role: UserRole;
  }) {
    return this.userModel.create({
      email: payload.email.toLowerCase(),
      passwordHash: payload.passwordHash,
      role: payload.role,
    });
  }

  async updateUser(
    id: string,
    payload: { email?: string; passwordHash?: string },
  ) {
    const update: any = {};
    if (payload.email) update.email = payload.email.toLowerCase();
    if (payload.passwordHash) update.passwordHash = payload.passwordHash;

    const updated = await this.userModel
      .findByIdAndUpdate(id, update, { new: true })
      .select('_id email role createdAt updatedAt')
      .lean()
      .exec();

    if (!updated) throw new NotFoundException('Usuário não encontrado');
    return updated;
  }

  async deleteUser(id: string) {
    const res = await this.userModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Usuário não encontrado');
    return { ok: true };
  }
}
