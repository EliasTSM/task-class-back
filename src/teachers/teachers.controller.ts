import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private users: UsersService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('page') page?: string) {
    return this.users.listByRole(
      'admin',
      Number(limit) || 10,
      Number(page) || 1,
    );
  }

  @Post()
  async create(@Body() dto: CreateTeacherDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const created = await this.users.createUser({
      email: dto.email,
      passwordHash,
      role: 'admin',
    });

    // retorno seguro
    return {
      _id: created._id,
      email: created.email,
      role: created.role,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    const passwordHash = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : undefined;
    return this.users.updateUser(id, { email: dto.email, passwordHash });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.users.deleteUser(id);
  }
}
