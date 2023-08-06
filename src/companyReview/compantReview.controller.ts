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
import { CompanyReviewService } from './compantReview.service';
import { PaginationDto, createFaqDto, updateFaqDto } from 'dtos';
import {
  CreateCompantReviewDto,
  UpdateCopantReviewDto,
} from 'dtos/companyReview.dto';

@Controller('company-review')
export class CompanyReviewController {
  constructor(private readonly companyReviewService: CompanyReviewService) {}

  @Get('/')
  async getAll(@Query() query: PaginationDto) {
    const result = await this.companyReviewService.getAll(query);
    return { result, statusCode: HttpStatus.OK };
  }

  @Post('/')
  async save(@Body() body: CreateCompantReviewDto) {
    const data = await this.companyReviewService.save(body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCopantReviewDto,
  ) {
    const data = await this.companyReviewService.update(id, body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.companyReviewService.getOne(id);
    return { data, statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.companyReviewService.deleteOne(id);
    return { data, statusCode: HttpStatus.OK };
  }
}
