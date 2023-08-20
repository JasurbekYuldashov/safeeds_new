import { BlogContentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, ValidateNested } from 'class-validator';

export class ContentDto {
  @IsEnum(BlogContentType)
  type: 'TEXT' | 'IMAGE';

  @IsString()
  content: string;
}

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  icon: string;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  content: ContentDto[];
}

export class UpdateBlogDto {
  @IsString()
  title: string;

  @IsString()
  icon: string;

  @IsString()
  @IsOptional()
  description: string;
  
  @IsString()
  @IsOptional()
  author: string;

  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  content: ContentDto[];
}
