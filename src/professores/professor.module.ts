import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Professor, ProfessorSchema } from './professor.schema';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professor.name, schema: ProfessorSchema },
    ]),
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [ProfessorService],
})
export class ProfessorModule {}