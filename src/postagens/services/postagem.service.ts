import { Injectable, NotFoundException } from "@nestjs/common";
import { PostagemRepository } from "../repositories/postagem.repository";
import { IPostagem } from "../schemas/models/postagem.interface";

@Injectable()
export class PostagemSerice {
    constructor(private readonly postagemRepository: PostagemRepository){}

    async getAllPostagens(limit: number, page: number) {
        return this.postagemRepository.getAllPostagens(limit, page);
    }

    async getPostagemById(postagemId: string) {
        const postagem = this.postagemRepository.getPostagemById(postagemId);
        if(!postagem) throw new NotFoundException('Postagem não encontrada');
        return postagem;
    }

    async createPostagem(postagem: IPostagem) {
        return this.postagemRepository.createPostagem(postagem);
    }

    async updatePostagem(postagemId: string, postagem: IPostagem) {
        return this.postagemRepository.updatePostagem(postagemId, postagem);
    }

    async deletePostagem(postagemId: string) {
        return this.postagemRepository.deletePostagem(postagemId);
    }
}