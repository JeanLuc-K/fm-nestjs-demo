import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.genre.findMany();
  }

  async findOne(id: string) {
    const genre = await this.prismaService.genre.findUnique({ where: { id } });
    if (!genre) throw new NotFoundException(`Genre with id ${id} not found`);
    return genre;
  }

  async create(data: { name: string }) {
    try {
      return await this.prismaService.genre.create({
        data: { id: crypto.randomUUID(), ...data, updatedAt: new Date() },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Genre with name "${data.name}" already exists`);
      }
      throw e;
    }
  }

  async update(id: string, data: { name?: string }) {
    await this.findOne(id);
    try {
      return await this.prismaService.genre.update({
        where: { id },
        data: { ...data, updatedAt: new Date() },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Genre with name "${data.name}" already exists`);
      }
      throw e;
    }
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prismaService.genre.delete({ where: { id } });
  }
}
