import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Justificativa, JustificativaSchema } from './justificativa.schema';
import { JustificativaService } from './justificativa.service';
import { JustificativaController } from './justificativa.controller';
import { AlunoModule } from '../alunos/aluno.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Justificativa.name, schema: JustificativaSchema },
    ]),
    AlunoModule,
    UserModule,
  ],
  controllers: [JustificativaController],
  providers: [JustificativaService],
})
export class JustificativaModule {}