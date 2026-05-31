import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './genres.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateGenreDto) {
    return this.genresService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string }) {
    return this.genresService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.genresService.delete(id);
  }
}
