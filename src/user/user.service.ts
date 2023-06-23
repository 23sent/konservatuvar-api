import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(user_id: number) {
    const userInfo = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    const answers = await this.prisma.userQuestionAccuracy.findMany({
      where: {
        user_id: user_id,
      },
    });

    let total_accuracy = 0;
    let total_answers = 0;
    for (let event of answers) {
      total_answers += event.answer_count;
      total_accuracy += event.accuracy;
    }

    return {
      ...userInfo,
      accuracy: total_accuracy,
      answer_count: total_answers,
    };
  }

  async getExercisesOfUser(user_id: number) {
    return await this.prisma.exercise.findMany({
      where: {
        user_id: user_id,
      },
    });
  }
}
