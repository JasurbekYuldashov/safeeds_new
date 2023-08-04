import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompantReviewDto, UpdateCopantReviewDto } from 'dtos/companyReview.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CompanyReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.companyReview.findMany({});
  }

  async save(data: CreateCompantReviewDto) {
    return this.prisma.companyReview.create({ data });
  }

  async update(id: number, data: UpdateCopantReviewDto) {
    const checkData = await this.prisma.companyReview.findUnique({ where: { id } });
    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.companyReview.update({ data, where: { id } });
  }

  async getOne(id: number) {
    const data = await this.prisma.companyReview.findUnique({ where: { id } });
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
    const data = await this.prisma.companyReview.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.companyReview.delete({ where: { id } });
  }
}
