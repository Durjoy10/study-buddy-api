import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ForumModule } from './modules/forum/forum.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { PapersModule } from './modules/papers/papers.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb+srv://durjoy1514135:123456qwE@ecom.wbhww.mongodb.net/studybuddy'),
        AuthModule,
        UsersModule,
        QuestionsModule,
        ProjectsModule,
        MaterialsModule,
        ForumModule,
        UploadsModule,
        PapersModule,
    ],
})
export class AppModule { } 