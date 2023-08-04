import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('post-quote')
export class PostQuoteController {
  constructor(private configService: ConfigService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async postQuote(@Body() body) {
    try {
      const url = this.configService.get<string>('url');
      const api_key = this.configService.get<string>('token');
      await fetch(url, {
        method: 'POST',
        body: {
          ...body,
          api_key,
        },
      });
      return {
        message: 'Quote posted',
        statusCode: HttpStatus.OK,
        result: true,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Something went wrong',
          error: err,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
