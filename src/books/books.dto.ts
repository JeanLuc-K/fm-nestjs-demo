import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'UUID of the author' })
  @IsString()
  @IsNotEmpty()
  authorId!: string;

  @ApiProperty({ description: 'UUID of the publisher' })
  @IsString()
  @IsNotEmpty()
  publisherId!: string;

  @ApiPropertyOptional({ description: 'List of genre UUIDs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genreIds?: string[];
}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  authorId?: string;

  @IsString()
  @IsNotEmpty()
  publisherId?: string;
}
