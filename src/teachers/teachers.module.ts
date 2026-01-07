import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TeachersController } from './teachers.controller';

@Module({
  imports: [UsersModule],
  controllers: [TeachersController],
})
export class TeachersModule {}
