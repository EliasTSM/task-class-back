import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { PostagemRepository } from '../repositories/postagem.repository';
import { IPostagem } from '../schemas/models/postagem.interface';

const mockPostagemRepository = {
  getAllPostagens: jest.fn(),
  getPostagemById: jest.fn(),
  createPostagem: jest.fn(),
  updatePostagem: jest.fn(),
  deletePostagem: jest.fn(),
};

describe('PostagemSerice', () => {
  let service: PostagemService;
  let repository: typeof mockPostagemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostagemService,
        {
          provide: PostagemRepository,
          useValue: mockPostagemRepository,
        },
      ],
    }).compile();

    service = module.get<PostagemService>(PostagemService);
    repository = module.get(PostagemRepository);

    for (const key in mockPostagemRepository) {
      if (typeof mockPostagemRepository[key] === 'function') {
        mockPostagemRepository[key].mockClear();
      }
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPostagens', () => {
    it('should call repository.getAllPostagens and return the result', async () => {
      const expectedPostagens: IPostagem[] = [{
          id: '1', 
          titulo: 'Post 1', 
          conteudo: 'Conteudo 1',
          disciplina: 'disciplina 1',
          turma: 'Turma 1',
          autor: 'Autor 1',
      }];
      repository.getAllPostagens.mockResolvedValue(expectedPostagens);

      const result = await service.getAllPostagens(10, 1);

      expect(repository.getAllPostagens).toHaveBeenCalledWith(10, 1);
      expect(result).toEqual(expectedPostagens);
    });
  });

  describe('getPostagemById', () => {
    it('should call repository.getPostagemById and return the postagem if found', async () => {
      const postagemId = 'some-id';
      const expectedPostagem: IPostagem = {
          id: postagemId, titulo: 'Post Teste', conteudo: 'Conteudo Teste',
          disciplina: 'Disciplina Teste',
          turma: 'Turma Teste',
          autor: 'Autor Teste',
      };
      repository.getPostagemById.mockResolvedValue(expectedPostagem);

      const result = await service.getPostagemById(postagemId);

      expect(repository.getPostagemById).toHaveBeenCalledWith(postagemId);
      expect(result).toEqual(expectedPostagem);
    });

    it('should throw NotFoundException if postagem is not found', async () => {
      const postagemId = 'non-existent-id';
      repository.getPostagemById.mockResolvedValue(null);

      await expect(service.getPostagemById(postagemId)).rejects.toThrow(NotFoundException);
      await expect(service.getPostagemById(postagemId)).rejects.toThrow('Postagem não encontrada');
      expect(repository.getPostagemById).toHaveBeenCalledWith(postagemId);
    });
  });

  describe('createPostagem', () => {
    it('should call repository.createPostagem and return the created postagem', async () => {
      const newPostagem: IPostagem = {
          titulo: 'Novo Post', conteudo: 'Conteudo do novo post',
          disciplina: 'Disciplina',
          autor: 'Autor'
      };
      const createdPostagem: IPostagem = { id: 'new-id', ...newPostagem };
      repository.createPostagem.mockResolvedValue(createdPostagem);

      const result = await service.createPostagem(newPostagem);

      expect(repository.createPostagem).toHaveBeenCalledWith(newPostagem);
      expect(result).toEqual(createdPostagem);
    });
  });

  describe('updatePostagem', () => {
    it('should call repository.updatePostagem and return the updated postagem', async () => {
      const postagemId = 'some-id';
      const updateData: IPostagem = {
          titulo: 'Titulo Atualizado', conteudo: 'Conteudo Atualizado',
          disciplina: 'Disciplina Atualizada',
          autor: 'Autor Atualizado'
      };
      const updatedPostagem: IPostagem = { id: postagemId, ...updateData };
      repository.updatePostagem.mockResolvedValue(updatedPostagem);

      const result = await service.updatePostagem(postagemId, updateData);

      expect(repository.updatePostagem).toHaveBeenCalledWith(postagemId, updateData);
      expect(result).toEqual(updatedPostagem);
    });
  });

  describe('deletePostagem', () => {
    it('should call repository.deletePostagem and return the result', async () => {
      const postagemId = 'some-id';
      repository.deletePostagem.mockResolvedValue({ deletedCount: 1 });

      const result = await service.deletePostagem(postagemId);

      expect(repository.deletePostagem).toHaveBeenCalledWith(postagemId);
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});