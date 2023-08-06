import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateTeamReviewDto {
  @IsInt()
  @Min(0)
  @Max(5)
  startCount: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  teamUserId: number;
}

export class UpdateTeamReviewDto {
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

  // @IsInt()
  // @IsOptional()
  // teamUserId: number;
}
