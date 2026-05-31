import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {

  constructor(private readonly authorsService: AuthorsService,
              private readonly prismaService: PrismaService
  ) {}

  async findAll() {
    return this.prismaService.book.findMany()
  };

  async findOne(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }
  
  async create(data: { title: string; authorId: string; publisherId: string }) {
    return this.prismaService.book.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prismaService.book.delete({
      where: { id },
    });
  }

  async update(id: string, data: { title?: string; authorId?: string; publisherId?: string }) {
    await this.findOne(id);
    return this.prismaService.book.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }
}
