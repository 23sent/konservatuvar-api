import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestionById(question_id: number) {
    return this.prisma.question.findUnique({
      where: {
        id: question_id,
      },
    });
  }

  async createQuestion(questionDTO: CreateQuestionDTO) {
    return this.prisma.question.create({
      data: { ...questionDTO },
    });
  }

  async updateQuestion(
    question_id: number,
    questionDTO: UpdateQuestionDTO,
  ) {
    return this.prisma.question.update({
      where: {
        id: question_id,
      },
      data: { ...questionDTO },
    });
  }

  async deleteQuestion(question_id: number) {
    return this.prisma.question.delete({ where: { id: question_id } });
  }
}
