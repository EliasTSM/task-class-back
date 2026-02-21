import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AlunoModule } from './alunos/aluno.module';
import { JustificativaModule } from './justificativas/justificativa.module';
import { PresencaModule } from './presencas/presenca.module';
import { ProfessorModule } from './professores/professor.module';
import { TurmaModule } from './turmas/turma.module';
import { UserModule } from './users/user.module';
import { PostagensModule } from './postagens/postagem.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskclass',
    ),

    AlunoModule,
    JustificativaModule,
    ProfessorModule,
    PresencaModule,
    AuthModule,
    TurmaModule,
    UserModule,
    PostagensModule
  ],
})
export class AppModule {}