import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { IUser } from './user.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.COORDENACAO)
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @Roles(UserRole.COORDENACAO)
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Post()
  @Roles(UserRole.COORDENACAO)
  async create(@Body() user: IUser) {
    return this.userService.create(user);
  }

  @Put(':id')
  @Roles(UserRole.COORDENACAO)
  async update(
    @Param('id') id: string,
    @Body() user: Partial<IUser>,
  ) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @Roles(UserRole.COORDENACAO)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}