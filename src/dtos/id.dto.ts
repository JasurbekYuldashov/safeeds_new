import { IsNumber } from 'class-validator';
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { Transform, plainToClass } from 'class-transformer';

export class idDto {
  @IsNumber({}, { message: 'Invalid value' })
  id: number;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

import { IsInt, Min, Max } from 'class-validator';

export class QueryParamsDto {
  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;
}

export class RouteParamsDto {
  @IsNumber()
  @Transform((validate) => {
    return parseInt(validate.value)
  })
  id: number;
}
