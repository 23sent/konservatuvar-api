import { IsNotEmpty, IsObject } from 'class-validator';

export class UpdateQuestionDTO {
  @IsObject()
  @IsNotEmpty()
  content: object;
}
