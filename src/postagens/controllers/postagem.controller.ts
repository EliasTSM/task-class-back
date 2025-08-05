import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import type { IPostagem } from "../schemas/models/postagem.interface";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Posatgem')
@Controller('postagem')
export class PostagemController {
    constructor(private readonly postagemService: PostagemService){}

    @Get()
    async getAllPostagens(@Query('limit') limit: number, @Query('page') page: number) {
        return this.postagemService.getAllPostagens(limit, page);
    }

    @Get(':postagemId')
    async getPostagemById(@Param('postagemId') postagemId: string) {
        return this.postagemService.getPostagemById(postagemId);
    }
    
    @Post()
    async createPostagem(@Body() postagem: IPostagem) {
        return this.postagemService.createPostagem(postagem);
    }
    
    @Put(':postagemId')
    async updatePostagem(@Param('postagemId') postagemId: string, @Body() postagem: IPostagem) {
        return this.postagemService.updatePostagem(postagemId, postagem);
    }
    
    @Delete(':postagemId')
    async deletePostagem(@Param('postagemId') postagemId: string) {
        return this.postagemService.deletePostagem(postagemId);
    }

}