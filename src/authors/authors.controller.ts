import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'Returns all authors' })
  @Get()
  async findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Get an author by id' })
  @ApiParam({ name: 'id', type: String, description: 'Author UUID' })
  @ApiResponse({ status: 200, description: 'Returns the author' })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an author' })
  @ApiResponse({ status: 201, description: 'Author created' })
  @Post()
  async create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiParam({ name: 'id', type: String, description: 'Author UUID' })
  @ApiResponse({ status: 200, description: 'Author updated' })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiParam({ name: 'id', type: String, description: 'Author UUID' })
  @ApiResponse({ status: 200, description: 'Author deleted' })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.authorsService.delete(id);
  }
}
