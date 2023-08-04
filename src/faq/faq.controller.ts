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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { createFaqDto, updateFaqDto } from 'dtos';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get('/')
  async getAll() {
    const data = await this.faqService.getAll();
    return { data, statusCode: HttpStatus.OK };
  }

  @Post('/')
  async save(@Body() body: createFaqDto) {
    const data = await this.faqService.save(body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateFaqDto,
  ) {
    const data = await this.faqService.update(id, body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.faqService.getOne(id);
    return { data, statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.faqService.deleteOne(id);
    return { data, statusCode: HttpStatus.OK };
  }
}
