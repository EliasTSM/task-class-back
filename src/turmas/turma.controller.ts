import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TurmaService } from './turma.service';
import type { ITurma } from './turma.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('turmas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Get()
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async getAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ) {
    return this.turmaService.getAll(Number(limit), Number(page));
  }

  @Get(':id')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async getById(@Param('id') id: string) {
    return this.turmaService.getById(id);
  }

  @Post()
  @Roles(UserRole.COORDENACAO)
  async create(@Body() turma: ITurma) {
    return this.turmaService.create(turma);
  }

  @Put(':id')
  @Roles(UserRole.COORDENACAO)
  async update(
    @Param('id') id: string,
    @Body() turma: Partial<ITurma>,
  ) {
    return this.turmaService.update(id, turma);
  }

  @Delete(':id')
  @Roles(UserRole.COORDENACAO)
  async delete(@Param('id') id: string) {
    return this.turmaService.delete(id);
  }
}