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
import { ProfessorService } from './professor.service';
import type { IProfessor } from './professor.interface';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('professores')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  // 🔎 Coordenação pode ver todos
  @Get()
  @Roles(UserRole.COORDENACAO)
  async getAll() {
    return this.professorService.getAll();
  }

  // 🔎 Coordenação pode buscar por ID
  @Get(':id')
  @Roles(UserRole.COORDENACAO)
  async getById(@Param('id') id: string) {
    return this.professorService.getById(id);
  }

  // ➕ Apenas Coordenação pode criar
  @Post()
  @Roles(UserRole.COORDENACAO)
  async create(@Body() professor: IProfessor) {
    return this.professorService.create(professor);
  }

  // ✏️ Apenas Coordenação pode editar
  @Put(':id')
  @Roles(UserRole.COORDENACAO)
  async update(
    @Param('id') id: string,
    @Body() professor: IProfessor,
  ) {
    return this.professorService.update(id, professor);
  }

  // ❌ Apenas Coordenação pode excluir
  @Delete(':id')
  @Roles(UserRole.COORDENACAO)
  async delete(@Param('id') id: string) {
    return this.professorService.delete(id);
  }
}