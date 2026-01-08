import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Seed simples (faculdade): cria admin e student se não existirem
  const users = app.get(UsersService);

  const adminPass = await bcrypt.hash('admin123', 10);
  const studentPass = await bcrypt.hash('aluno123', 10);

  await users.createIfNotExists({
    email: 'admin@taskclass.com',
    passwordHash: adminPass,
    role: 'admin',
  });
  await users.createIfNotExists({
    email: 'aluno@taskclass.com',
    passwordHash: studentPass,
    role: 'student',
  });

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
