import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const categories = await this.prisma.category.findMany({
        orderBy: [
          {
            id: 'asc',
          },
        ],
      });
      return categories;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async getCategoryByID(category_id: number) {
    const categories = await this.prisma.category.findUnique({
      where: { id: category_id },
      include: {
        exercises: {
          select: {
            id: true,
            title: true,
            description: true,
          },

          orderBy: [
            {
              created_at: 'asc',
            },
          ],
        },
      },
    });
    return categories;
  }
}
