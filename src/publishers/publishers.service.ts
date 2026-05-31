import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PublishersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.publisher.findMany();
  }

  async findOne(id: string) {
    const publisher = await this.prismaService.publisher.findUnique({
      where: { id },
    });
    if (!publisher) throw new NotFoundException(`Publisher with id ${id} not found`);
    return publisher;
  }

  async create(data: { name: string }) {
    try {
      return await this.prismaService.publisher.create({
        data: {
          id: crypto.randomUUID(),
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Publisher with name "${data.name}" already exists`);
      }
      throw e;
    }
  }

  async update(id: string, data: { name?: string }) {
    await this.findOne(id);
    try {
      return await this.prismaService.publisher.update({
        where: { id },
        data: { ...data, updatedAt: new Date() },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Publisher with name "${data.name}" already exists`);
      }
      throw e;
    }
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prismaService.publisher.delete({
      where: { id },
    });
  }
}
