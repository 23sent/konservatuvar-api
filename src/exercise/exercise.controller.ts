import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDTO } from './dto/exercise.dto';
import { UpdateExerciseDTO } from './dto';
import { JwtGuard } from 'src/auth/guards';
import { User } from 'src/auth/decorator/get_user.decorator';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseServise: ExerciseService) {}

  @Get('')
  getAllExercises() {
    return this.exerciseServise.getAll();
  }

  @Get(':exercise_id')
  getExerciseById(
    @Param('exercise_id', ParseIntPipe) exercise_id: number,
  ) {
    return this.exerciseServise.getExerciseById(exercise_id);
  }

  @UseGuards(JwtGuard)
  @Post('')
  createExercise(
    @Body() exerciseDTO: CreateExerciseDTO,
    @User('id', ParseIntPipe) user_id: number,
  ) {
    return this.exerciseServise.createExercise(exerciseDTO, user_id);
  }

  @UseGuards(JwtGuard)
  @Put(':exercise_id')
  updateExercise(
    @Param('exercise_id', ParseIntPipe) exercise_id: number,
    @Body() exerciseDTO: UpdateExerciseDTO,
  ) {
    return this.exerciseServise.updateExercise(exercise_id, exerciseDTO);
  }

  // TODO: Exercise Delete
  @Delete(':exercise_id')
  deleteExercise(@Param('exercise_id', ParseIntPipe) exercise_id: number) {
    return this.exerciseServise.deleteExercise(exercise_id);
  }
}
