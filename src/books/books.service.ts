import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {

  constructor(private readonly authorsService: AuthorsService,
              private readonly prismaService: PrismaService
  ) {}

  async findAll(includeAuthor = false) {
    return this.prismaService.book.findMany({
      include: {
        genres: true,
        author: includeAuthor,
      },
    });
  };

  async findOne(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
      include: { genres: true },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }
  
  async create(data: { title: string; authorId: string; publisherId: string; genreIds?: string[] }) {
    const { genreIds, ...bookData } = data;
    return this.prismaService.book.create({
      data: {
        id: crypto.randomUUID(),
        ...bookData,
        updatedAt: new Date(),
        ...(genreIds && { genres: { connect: genreIds.map((id) => ({ id })) } }),
      },
      include: { genres: true },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prismaService.book.delete({
      where: { id },
    });
  }

  async update(id: string, data: { title?: string; authorId?: string; publisherId?: string; genreIds?: string[] }) {
    await this.findOne(id);
    const { genreIds, ...updateData } = data;
    return this.prismaService.book.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
        ...(genreIds !== undefined && { genres: { set: genreIds.map((id) => ({ id })) } }),
      },
      include: { genres: true },
    });
  }
}
