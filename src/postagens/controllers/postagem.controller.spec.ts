import { Test, TestingModule } from '@nestjs/testing';
import { PostagemController } from './postagem.controller';
import { PostagemService } from '../services/postagem.service';
import { IPostagem } from '../schemas/models/postagem.interface';
import { NotFoundException } from '@nestjs/common';

const mockPostagemService = {
  getAllPostagens: jest.fn(),
  getPostagemById: jest.fn(),
  createPostagem: jest.fn(),
  updatePostagem: jest.fn(),
  deletePostagem: jest.fn(),
};

describe('PostagemController', () => {
  let controller: PostagemController;
  let service: PostagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostagemController],
      providers: [
        {
          provide: PostagemService,
          useValue: mockPostagemService,
        },
      ],
    }).compile();

    controller = module.get<PostagemController>(PostagemController);
    service = module.get<PostagemService>(PostagemService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPostagens', () => {
    it('should return an array of postagens', async () => {
      const result: IPostagem[] = [
        {
            id: '1', titulo: 'Test 1', conteudo: 'Conteudo 1',
            disciplina: 'Disciplina 1',
            autor: 'Autor 1'
        },
        {
            id: '2', titulo: 'Test 2', conteudo: 'Conteudo 2',
            disciplina: 'Disciplina 2',
            autor: 'Autor 2'
        },
      ];
      const limit = 10;
      const page = 1;

      mockPostagemService.getAllPostagens.mockResolvedValue(result);

      const response = await controller.getAllPostagens(limit, page);

      expect(service.getAllPostagens).toHaveBeenCalledWith(limit, page);
      expect(response).toEqual(result);
    });

    it('should return an empty array if no postagens are found', async () => {
      mockPostagemService.getAllPostagens.mockResolvedValue([]);
      const limit = 10;
      const page = 1;

      const response = await controller.getAllPostagens(limit, page);

      expect(service.getAllPostagens).toHaveBeenCalledWith(limit, page);
      expect(response).toEqual([]);
    });
  });

  describe('getPostagemById', () => {
    it('should return a single postagem', async () => {
      const postagemId = 'some-id';
      const result: IPostagem = {
          id: postagemId, titulo: 'Test Post', conteudo: 'Conteudo',
          disciplina: 'Test Disciplina',
          autor: 'Test Autor'
      };

      mockPostagemService.getPostagemById.mockResolvedValue(result);

      const response = await controller.getPostagemById(postagemId);

      expect(service.getPostagemById).toHaveBeenCalledWith(postagemId);
      expect(response).toEqual(result);
    });

    it('should throw NotFoundException if postagem is not found', async () => {
      const postagemId = 'non-existent-id';

      mockPostagemService.getPostagemById.mockRejectedValue(new NotFoundException('Postagem não encontrada'));

      await expect(controller.getPostagemById(postagemId)).rejects.toThrow(NotFoundException);
      await expect(controller.getPostagemById(postagemId)).rejects.toThrow('Postagem não encontrada');
      expect(service.getPostagemById).toHaveBeenCalledWith(postagemId);
    });
  });

  describe('createPostagem', () => {
    it('should create a new postagem', async () => {
      const newPostagem: IPostagem = {
          titulo: 'New Post', conteudo: 'New Conteudo',
          disciplina: 'New Disciplina',
          autor: 'New Autor'
      };
      const createdPostagem: IPostagem = { id: 'new-id', ...newPostagem };

      mockPostagemService.createPostagem.mockResolvedValue(createdPostagem);

      const response = await controller.createPostagem(newPostagem);

      expect(service.createPostagem).toHaveBeenCalledWith(newPostagem);
      expect(response).toEqual(createdPostagem);
    });
  });

  describe('updatePostagem', () => {
    it('should update an existing postagem', async () => {
      const postagemId = 'update-id';
      const updatedData: IPostagem = {
          titulo: 'Updated Titulo', conteudo: 'Updated Conteudo',
          disciplina: 'Update Disciplina',
          autor: 'Update Autor'
      };
      const result: IPostagem = { id: postagemId, ...updatedData };

      mockPostagemService.updatePostagem.mockResolvedValue(result);

      const response = await controller.updatePostagem(postagemId, updatedData);

      expect(service.updatePostagem).toHaveBeenCalledWith(postagemId, updatedData);
      expect(response).toEqual(result);
    });

    it('should throw NotFoundException if postagem to update is not found', async () => {
      const postagemId = 'non-existent-id';
      const updatedData: IPostagem = {
          titulo: 'Updated Titulo', conteudo: 'Updated Conteudo',
          disciplina: 'Update Disciplina',
          autor: 'Update Autoe'
      };

      mockPostagemService.updatePostagem.mockRejectedValue(new NotFoundException('Postagem não encontrada para atualização'));

      await expect(controller.updatePostagem(postagemId, updatedData)).rejects.toThrow(NotFoundException);
      expect(service.updatePostagem).toHaveBeenCalledWith(postagemId, updatedData);
    });
  });

  describe('deletePostagem', () => {
    it('should delete a postagem successfully', async () => {
      const postagemId = 'delete-id';
      mockPostagemService.deletePostagem.mockResolvedValue({});

      const response = await controller.deletePostagem(postagemId);

      expect(service.deletePostagem).toHaveBeenCalledWith(postagemId);
      expect(response).toEqual({});
    });

    it('should throw NotFoundException if postagem to delete is not found', async () => {
      const postagemId = 'non-existent-id';

      mockPostagemService.deletePostagem.mockRejectedValue(new NotFoundException('Postagem não encontrada para exclusão'));

      await expect(controller.deletePostagem(postagemId)).rejects.toThrow(NotFoundException);
      expect(service.deletePostagem).toHaveBeenCalledWith(postagemId);
    });
  });
});