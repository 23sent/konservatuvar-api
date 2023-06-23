import {
  Controller,
  Post,
  UseGuards,
  ParseIntPipe,
  ParseFloatPipe,
  Body,
  Param,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { AccuracyService } from './accuracy.service';

@Controller('accuracy')
export class AccuracyController {
  constructor(private accuracyService: AccuracyService) {}
  @UseGuards(JwtGuard)
  @Post('my/:question_id')
  updateQuestionAccuracy(
    @User('id', ParseIntPipe) user_id,
    @Param('question_id', ParseIntPipe) question_id,
    @Body('accuracy', ParseFloatPipe) accuracy,
  ) {
    return this.accuracyService.updateQuestionAccuracy(
      user_id,
      question_id,
      accuracy,
    );
  }
}
