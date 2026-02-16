import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Presenca, PresencaSchema } from './presenca.schema';
import { PresencaService } from './presenca.service';
import { PresencaController } from './presenca.controller';
import { AlunoModule } from '../alunos/aluno.module';
import { TurmaModule } from '../turmas/turma.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Presenca.name, schema: PresencaSchema },
    ]),
    AlunoModule,
    TurmaModule,
  ],
  controllers: [PresencaController],
  providers: [PresencaService],
})
export class PresencaModule {}