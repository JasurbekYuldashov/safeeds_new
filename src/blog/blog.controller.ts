import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, PaginationDto } from 'dtos';
import { UpdateCopantReviewDto } from 'dtos/companyReview.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getAll(@Query() query: PaginationDto) {
    const result = await this.blogService.getAll(query);
    return { result, statusCode: HttpStatus.OK };
  }

  @Post('/')
  async save(@Body() body: CreateBlogDto) {
    const data = await this.blogService.save(body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCopantReviewDto,
  ) {
    const data = await this.blogService.update(id, body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.blogService.getOne(id);
    return { data, statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.blogService.deleteOne(id);
    return { data, statusCode: HttpStatus.OK };
  }
}
