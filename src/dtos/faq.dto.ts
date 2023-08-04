import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class createFaqDto {
  @IsString({ message: 'title must be string' })
  title: string;

  @IsString({ message: 'description must be string' })
  description: string;
}

export class updateFaqDto {
  @IsOptional()
  @IsString({ message: 'title must be string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'description must be url' })
  description: string;
}

export class deleteFaqOne {
  @IsNumber()
  id: number;
}
