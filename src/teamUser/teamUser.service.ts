import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamUserDto, UpdateTeamUserDto } from 'dtos';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeamUserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.teamUser.findMany({});
  }

  async save(data: CreateTeamUserDto) {
    const checkData = await this.prisma.teamUser.findUnique({
      where: { username: data.username },
    });
    if (checkData) {
      throw new BadRequestException({
        error: 'Bad Request',
        message: 'username already in use!',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return this.prisma.teamUser.create({ data });
  }

  async update(id: number, data: UpdateTeamUserDto) {
    let checkData = await this.prisma.teamUser.findUnique({
      where: { id },
    });

    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    checkData = await this.prisma.teamUser.findUnique({
      where: { username: data.username },
    });
    if (checkData && checkData.id !== id) {
      throw new BadRequestException({
        error: 'Bad Request',
        message: 'username already in use!',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return this.prisma.teamUser.update({ data, where: { id } });
  }

  async getOne(id: number) {
    const data = await this.prisma.teamUser.findUnique({ where: { id } });
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
    const data = await this.prisma.teamUser.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.prisma.$transaction([
      this.prisma.teamUserReview.deleteMany({ where: { teamUserId: id } }),
      this.prisma.teamUser.delete({ where: { id } }),
    ]);
  }
}
