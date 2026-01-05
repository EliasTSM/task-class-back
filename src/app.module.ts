import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostagensModule } from './postagens/postagens.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ⬇️ se MONGO_URI não existir, usa o padrão local
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskclass',
    ),

    PostagensModule,

    // ⬇️ idem para o JWT
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'taskclass-dev-secret',
      signOptions: { expiresIn: '10m' },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
