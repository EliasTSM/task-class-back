import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { StudentsController } from './students.controller';

@Module({
  imports: [UsersModule],
  controllers: [StudentsController],
})
export class StudentsModule {}
