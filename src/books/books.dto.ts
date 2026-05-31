import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  authorId!: string;

  @IsString()
  @IsNotEmpty()
  publisherId!: string;

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
