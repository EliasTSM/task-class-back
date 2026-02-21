import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Postagem, PostagemSchema } from './postagem.schema';
import { PostagemService } from './postagem.service';
import { PostagemController } from './postagem.controller';
import { ProfessorModule } from 'src/professores/professor.module';
import { TurmaModule } from 'src/turmas/turma.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Postagem.name, schema: PostagemSchema },
    ]),
    ProfessorModule,
    TurmaModule,
  ],
  controllers: [PostagemController],
  providers: [PostagemService],
})
export class PostagensModule {}
