import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get(':question_id')
  getQuestionById(
    @Param('question_id', ParseIntPipe) question_id: number,
  ) {
    return this.questionService.getQuestionById(question_id);
  }

  @UseGuards(JwtGuard)
  @Post()
  createQuestion(@Body() questionDTO: CreateQuestionDTO) {
    return this.questionService.createQuestion(questionDTO);
  }

  @UseGuards(JwtGuard)
  @Put(':question_id')
  updateQuestion(
    @Param('question_id', ParseIntPipe) question_id: number,
    @Body() questionDTO: UpdateQuestionDTO,
  ) {
    return this.questionService.updateQuestion(question_id, questionDTO);
  }

  @UseGuards(JwtGuard)
  @Delete(':question_id')
  deleteQuestion(@Param('question_id', ParseIntPipe) question_id: number) {
    return this.questionService.deleteQuestion(question_id);
  }

  // @UseGuards(JwtGuard)
  @Post('upload/:question_id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('question_id', ParseIntPipe) question_id: number,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    console.log(file);
    return 'Success';
  }
}
