import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './publishers.dto';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  async findAll() {
    return this.publishersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.publishersService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreatePublisherDto) {
    return this.publishersService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string }) {
    return this.publishersService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.publishersService.delete(id);
  }
}
