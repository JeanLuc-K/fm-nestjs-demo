import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.author.findMany();
  }

  async findOne(id: string) {
    const author = await this.prismaService.author.findUnique({ where: { id } });
    if (!author) throw new NotFoundException(`Author with id ${id} not found`);
    return author;
  }

  async create(data: { name: string; email: string }) {
    return this.prismaService.author.create({
      data: { id: crypto.randomUUID(), ...data, updatedAt: new Date() },
    });
  }

  async update(id: string, data: { name?: string; email?: string }) {
    await this.findOne(id);
    return this.prismaService.author.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prismaService.author.delete({ where: { id } });
  }
}

