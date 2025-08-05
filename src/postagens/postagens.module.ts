import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Postagem, PostagemSchema } from './schemas/postagem.schema';
import { PostagemRepository } from './repositories/postagem.repository';
import { PostagemMongooseRepository } from './repositories/mongoose/postagem.mongoose.repository';
import { PostagemSerice } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Postagem.name,
                schema: PostagemSchema,
            },
        ]),
    ],
    providers: [
        {
            provide: PostagemRepository,
            useClass: PostagemMongooseRepository,
        },
        PostagemSerice,
    ],
    controllers: [
        PostagemController
    ],
})
export class PostagensModule {}
