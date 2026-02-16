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
import { PresencaService } from './presenca.service';
import type { IPresenca } from './presenca.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('presencas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PresencaController {
  constructor(private readonly presencaService: PresencaService) {}

  // 🔎 Coordenação pode ver tudo
  @Get()
  @Roles(UserRole.COORDENACAO)
  async getAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ) {
    return this.presencaService.getAll(Number(limit), Number(page));
  }

  // 🔎 Professor pode ver por turma
  @Get('turma/:turmaId')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async getByTurma(@Param('turmaId') turmaId: string) {
    return this.presencaService.getByTurma(turmaId);
  }

  // 🔎 Professor e Coordenação podem ver por aluno
  @Get('aluno/:alunoId')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async getByAluno(@Param('alunoId') alunoId: string) {
    return this.presencaService.getByAluno(alunoId);
  }

  // ➕ Professor pode lançar presença
  @Post()
  @Roles(UserRole.PROFESSOR)
  async create(@Body() presenca: IPresenca) {
    return this.presencaService.create(presenca);
  }

  // ✏️ Coordenação pode editar
  @Put(':id')
  @Roles(UserRole.COORDENACAO)
  async update(
    @Param('id') id: string,
    @Body() presenca: Partial<IPresenca>,
  ) {
    return this.presencaService.update(id, presenca);
  }

  // ❌ Coordenação pode excluir
  @Delete(':id')
  @Roles(UserRole.COORDENACAO)
  async delete(@Param('id') id: string) {
    return this.presencaService.delete(id);
  }
}