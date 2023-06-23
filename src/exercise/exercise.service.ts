import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDTO } from './dto/exercise.dto';
import { UpdateExerciseDTO } from './dto';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const exercises = this.prisma.exercise.findMany();
    return exercises;
  }

  async getExerciseById(exercise_id: number) {
    const exercise = this.prisma.exercise.findUnique({
      where: {
        id: exercise_id,
      },

      include: {
        questions: {
          orderBy: [
            {
              created_at: 'asc',
            },
          ],
        },
      },
    });
    return exercise;
  }

  async createExercise(exerciseDTO: CreateExerciseDTO, user_id: number) {
    const exercise = await this.prisma.exercise.create({
      data: {
        ...exerciseDTO,
        user_id: user_id,
      },
    });

    return exercise;
  }

  async updateExercise(
    exercise_id: number,
    exerciseDTO: UpdateExerciseDTO,
  ) {
    const exercise = await this.prisma.exercise.update({
      where: {
        id: exercise_id,
      },
      data: {
        ...exerciseDTO,
      },
    });

    return exercise;
  }

  async deleteExercise(exercise_id: number) {
    return this.prisma.exercise.delete({ where: { id: exercise_id } });
  }

  async getExercisesOfUser(exercise_id: number) {
    const exercise = this.prisma.exercise.findUnique({
      where: {
        id: exercise_id,
      },

      include: {
        questions: {
          orderBy: [
            {
              created_at: 'asc',
            },
          ],
        },
      },
    });
    return exercise;
  }
}
