import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [BooksService, PrismaService],
  controllers: [BooksController],
  imports: [AuthorsModule],
})
export class BooksModule {}
