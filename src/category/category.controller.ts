import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':category_id')
  getCategoryByID(
    @Param('category_id', ParseIntPipe) category_id: number,
  ) {
    return this.categoryService.getCategoryByID(category_id);
  }
}
