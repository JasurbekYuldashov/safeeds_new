import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamReviewDto, UpdateTeamReviewDto } from 'dtos';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeamUserReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.teamUserReview.findMany({});
  }

  async getByTeamUser(id: number) {
    const checkData = await this.prisma.teamUser.findUnique({
      where: { id },
    });
    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Team user not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.teamUserReview.findMany({
      where: { teamUserId: id },
    });
  }

  async save(data: CreateTeamReviewDto) {
    const checkData = await this.prisma.teamUser.findUnique({
      where: { id: data.teamUserId },
    });
    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Team user not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return this.prisma.teamUserReview.create({ data });
  }

  async update(id: number, data: UpdateTeamReviewDto) {
    let checkData = await this.prisma.teamUserReview.findUnique({
      where: { id },
    });

    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return this.prisma.teamUserReview.update({ data, where: { id } });
  }

  async getOne(id: number) {
    const data = await this.prisma.teamUserReview.findUnique({ where: { id } });
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
    const data = await this.prisma.teamUserReview.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.teamUserReview.delete({ where: { id } });
  }
}
