import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuestionDTO {
  @IsNotEmpty()
  content: object;

  @IsNumber()
  @IsNotEmpty()
  exercise_id: number;
}
