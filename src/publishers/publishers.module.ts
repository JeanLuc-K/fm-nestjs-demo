import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService, PrismaService],
  exports: [PublishersService],
})
export class PublishersModule {}
