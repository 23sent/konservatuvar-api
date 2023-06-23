import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Categories } from 'src/category/constants';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super();
    this.onStartCreations();
  }

  async onStartCreations() {
    for (let category of Categories) {
      const created_category = await this.category.upsert({
        where: { id: category.id },
        create: { ...category },
        update: { ...category, id: undefined },
      });
      console.log('Created category: ', created_category);
    }
  }
}
