import { BlogContentType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  ValidateNested,
} from 'class-validator';

export class ContentDto {
  @IsEnum(BlogContentType)
  type: "TEXT"|"IMAGE";

  @IsString()
  content: string;
}

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  icon: string;

  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  content: ContentDto[];
}

export class UpdateCopantReviewDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  startCount: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon: string;
}
