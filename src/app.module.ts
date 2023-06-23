import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ExerciseService } from './exercise/exercise.service';
import { ExerciseModule } from './exercise/exercise.module';
import { QuestionModule } from './question/question.module';
import { AccuracyModule } from './accuracy/accuracy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    CategoryModule,
    ExerciseModule,
    QuestionModule,
    AccuracyModule,
  ],
  providers: [],
})
export class AppModule {}
