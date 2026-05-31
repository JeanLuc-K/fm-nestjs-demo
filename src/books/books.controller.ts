import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'includeAuthor', required: false, type: Boolean, description: 'Include author details in response' })
  @ApiResponse({ status: 200, description: 'Returns all books' })
  @Get()
  async findAll(@Query('includeAuthor') includeAuthor?: string) {
    return this.booksService.findAll(includeAuthor === 'true');
  }

  @ApiOperation({ summary: 'Get a book by id' })
  @ApiParam({ name: 'id', type: String, description: 'Book UUID' })
  @ApiResponse({ status: 200, description: 'Returns the book' })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Get(':id')
  async findBookById(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({ status: 201, description: 'Book created' })
  @Post()
  async create(@Body() body: CreateBookDto) {
    return this.booksService.create(body);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'id', type: String, description: 'Book UUID' })
  @ApiResponse({ status: 200, description: 'Book deleted' })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.delete(id);
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', type: String, description: 'Book UUID' })
  @ApiResponse({ status: 200, description: 'Book updated' })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: { title?: string; authorId?: string; publisherId?: string }) {
    return this.booksService.update(id, body);
  }
}