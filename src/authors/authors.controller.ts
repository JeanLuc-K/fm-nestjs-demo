import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Post()
  async create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }
}
