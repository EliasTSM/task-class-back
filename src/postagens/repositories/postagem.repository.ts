import { IPostagem } from "../schemas/models/postagem.interface";

export abstract class PostagemRepository {
    abstract getAllPostagens(limit: number, page: number): Promise<IPostagem[]>;
    abstract getPostagemById(postagemId: string): Promise<IPostagem | null>;
    abstract createPostagem(postagem: IPostagem): Promise<void>;
    abstract updatePostagem(postagemId: string, postagem: IPostagem): Promise<void>;
    abstract deletePostagem(postagemId: string): Promise<void>;
    abstract searchPostagens(limit: number, page: number, info: string): Promise<IPostagem[]>;
}