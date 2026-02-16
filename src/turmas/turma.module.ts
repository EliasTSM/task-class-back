import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Turma, TurmaSchema } from './turma.schema';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Turma.name, schema: TurmaSchema },
    ]),
  ],
  controllers: [TurmaController],
  providers: [TurmaService],
  exports: [TurmaService],
})
export class TurmaModule {}