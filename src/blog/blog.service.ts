import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto, PaginationDto } from 'dtos';
import { UpdateCopantReviewDto } from 'dtos/companyReview.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateBlogDto } from '../dtos';
import { Content } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: PaginationDto) {
    const count = await this.prisma.blog.count();
    const data = await this.prisma.blog.findMany({
      skip: (query.page - 1) * query['page-size'],
      take: query['page-size'],
    });
    const contents = await Promise.all(
      data.map(async (e) => {
        return this.prisma.content.findMany({
          where: { id: { in: e.content } },
        });
      }),
    );
    return {
      meta: {
        totalPage: Math.ceil(count / query['page-size']),
        count,
        page: query.page,
      },
      data: data.map((e, index) => {
        return {
          ...e,
          content: contents[index],
        };
      }),
    };
  }

  async save(data: CreateBlogDto) {
    const transactionData = await this.prisma.$transaction([
      ...data.content.map((e) =>
        this.prisma.content.create({
          data: { content: e.content, type: e.type },
        }),
      ),
    ]);
    try {
      await this.prisma.blog.create({
        data: {
          icon: data.icon,
          title: data.title,
          content: transactionData.map((e) => e.id),
        },
      });
      return data;
    } catch (error) {
      await this.prisma.content.deleteMany({
        where: { id: { in: transactionData.map((e) => e.id) } },
      });
      throw new BadRequestException({
        error: 'Bad request',
        message: 'Something went wrong!',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(id: number, data: UpdateBlogDto) {
    const checkData = await this.prisma.blog.findUnique({
      where: { id },
    });
    const content = data.content;
    delete data.content;
    if (!checkData) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    const contentData =
      content?.length > 0 &&
      (await this.prisma.$transaction([
        ...content.map((e) => {
          return this.prisma.content.create({ data: e });
        }),
        this.prisma.content.deleteMany({
          where: { id: { in: checkData.content } },
        }),
      ]));
    return this.prisma.blog.update({
      where: { id },
      data: {
        ...checkData,
        ...data,
        content:
          contentData?.map?.((e: any) => e?.id as number).filter((e) => !!e) ??
          checkData.content,
      },
    });
  }

  async getOne(id: number) {
    const data = await this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
    const contents = await this.prisma.content.findMany({
      where: { id: { in: data.content } },
    });
    return {
      ...data,
      content: contents,
    };
  }

  async deleteOne(id: number) {
    const data = await this.prisma.blog.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'Item not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    await this.prisma.$transaction([
      this.prisma.content.deleteMany({ where: { id: { in: data.content } } }),
      this.prisma.blog.delete({ where: { id } }),
    ]);
    return true;
  }
}
