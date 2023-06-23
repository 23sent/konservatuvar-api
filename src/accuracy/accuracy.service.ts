import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccuracyService {
  constructor(private prisma: PrismaService) {}

  async updateQuestionAccuracy(
    user_id: number,
    question_id: number,
    accuracy: number,
  ) {
    return this.prisma.userQuestionAccuracy.upsert({
      where: {
        user_id_question_id: {
          user_id: user_id,
          question_id: question_id,
        },
      },
      create: {
        user_id: user_id,
        question_id: question_id,
        accuracy: accuracy,
        answer_count: 1,
      },
      update: {
        accuracy: { increment: accuracy },
        answer_count: { increment: 1 },
      },
    });
  }
}
