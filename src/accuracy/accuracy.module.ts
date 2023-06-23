import { Module } from '@nestjs/common';
import { AccuracyService } from './accuracy.service';
import { AccuracyController } from './accuracy.controller';

@Module({
  providers: [AccuracyService],
  controllers: [AccuracyController]
})
export class AccuracyModule {}
