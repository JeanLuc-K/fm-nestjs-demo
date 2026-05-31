import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query('includeAuthor') includeAuthor?: string) {
    return this.booksService.findAll(includeAuthor === 'true');
  }

  @Get(':id')
  async findBookById(@Param('id') id: string) {
    const book = await this.booksService.findOne(id);
    return book;
  }

  @Post()
  async create(@Body() body: CreateBookDto) {
    return this.booksService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { title?: string; authorId?: string; publisherId?: string }) {
    return this.booksService.update(id, body);
  }
}