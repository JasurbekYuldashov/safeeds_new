import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { createFaqDto, updateFaqDto } from 'dtos';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.fAQ.findMany({});
  }

  async save(data: createFaqDto) {
    return this.prisma.fAQ.create({ data });
  }

  async update(id: number, data: updateFaqDto) {
    const checkData = await this.prisma.fAQ.findUnique({ where: { id } });
    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.fAQ.update({ data, where: { id } });
  }

  async getOne(id: number) {
    const data = await this.prisma.fAQ.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return data;
  }

  async deleteOne(id: number) {
    const data = await this.prisma.fAQ.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.fAQ.delete({ where: { id } });
  }
}
