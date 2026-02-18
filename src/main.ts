import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from './app.module';
import { UserService } from './users/user.service';
import { UserRole } from './common/enums/user-role.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const users = app.get(UserService);

  const coordenadorPass = await bcrypt.hash('coordenador123', 10);
  const responsavelPass = await bcrypt.hash('responsavel123', 10);
  const professorPass = await bcrypt.hash('professor123', 10);

  await users.createIfNotExists({
    nome: 'Coordenador',
    email: 'coordenador@taskclass.com',
    senha: coordenadorPass,
    role: UserRole.COORDENACAO,
  });

  await users.createIfNotExists({
    nome: 'Responsavel Teste',
    email: 'responsavel@taskclass.com',
    senha: responsavelPass,
    role: UserRole.RESPONSAVEL,
  });

  await users.createIfNotExists({
    nome: 'Professor Teste',
    email: 'professor@taskclass.com',
    senha: professorPass,
    role: UserRole.PROFESSOR,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();