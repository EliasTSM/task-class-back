import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JustificativaService } from './justificativa.service';
import type { IJustificativa } from './justificativa.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('justificativas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class JustificativaController {
  constructor(private readonly justificativaService: JustificativaService) {}

  // 🔎 Coordenação pode ver todas
  @Get()
  @Roles(UserRole.COORDENACAO)
  async getAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ) {
    return this.justificativaService.getAll(Number(limit), Number(page));
  }

  // 🔎 Coordenação e responsável podem ver por aluno
  @Get('aluno/:alunoId')
  @Roles(UserRole.COORDENACAO, UserRole.RESPONSAVEL)
  async getByAluno(@Param('alunoId') alunoId: string) {
    return this.justificativaService.getByAluno(alunoId);
  }

  // ➕ Responsável cria justificativa
  @Post()
  @Roles(UserRole.RESPONSAVEL)
  async create(@Body() justificativa: IJustificativa) {
    return this.justificativaService.create(justificativa);
  }

  // ✅ Coordenação aprova
  @Patch(':id/aprovar')
  @Roles(UserRole.COORDENACAO)
  async aprovar(@Param('id') id: string) {
    return this.justificativaService.aprovar(id);
  }

  // ❌ Coordenação reprova
  @Patch(':id/reprovar')
  @Roles(UserRole.COORDENACAO)
  async reprovar(@Param('id') id: string) {
    return this.justificativaService.reprovar(id);
  }

  // ❌ Coordenação pode excluir
  @Delete(':id')
  @Roles(UserRole.COORDENACAO)
  async delete(@Param('id') id: string) {
    return this.justificativaService.delete(id);
  }
}