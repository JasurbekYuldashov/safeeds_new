import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateCompantReviewDto {
  @IsInt()
  @Min(0)
  @Max(5)
  startCount: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
  
  @IsString()
  icon: string;
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
