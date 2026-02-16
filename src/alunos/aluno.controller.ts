import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlunoService } from './aluno.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Alunos')
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @Roles(UserRole.COORDENACAO)
  create(@Body() dto: any) {
    return this.alunoService.create(dto);
  }

  @Get()
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async getById(@Param('id') id: string) {
    return this.alunoService.getById(id);
  }

  @Put(':id')
  @Roles(UserRole.COORDENACAO)
  update(@Param('id') id: string, @Body() dto: any) {
    return this.alunoService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.COORDENACAO)
  delete(@Param('id') id: string) {
    return this.alunoService.delete(id);
  }
}