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
import { PostagemService } from './postagem.service';
import type { IPostagem } from './postagem.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('posts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR, UserRole.ALUNO)
  async getAllPostagens(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postagemService.getAllPostagens(limit, page);
  }

  @Get('/search')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR, UserRole.ALUNO)
  async getAllPostagensSearch(@Query('search') search: string) {
    return this.postagemService.getAllPostagensSearch(search);
  }

  @Get(':postagemId')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR, UserRole.ALUNO)
  async getPostagemById(@Param('postagemId') postagemId: string) {
    return this.postagemService.getPostagemById(postagemId);
  }

  @Post()
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async createPostagem(@Body() postagem: IPostagem) {
    return this.postagemService.createPostagem(postagem);
  }

  @Put(':postagemId')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async updatePostagem(
    @Param('postagemId') postagemId: string,
    @Body() postagem: IPostagem,
  ) {
    return this.postagemService.updatePostagem(postagemId, postagem);
  }

  @Delete(':postagemId')
  @Roles(UserRole.COORDENACAO, UserRole.PROFESSOR)
  async deletePostagem(@Param('postagemId') postagemId: string) {
    return this.postagemService.deletePostagem(postagemId);
  }
}
