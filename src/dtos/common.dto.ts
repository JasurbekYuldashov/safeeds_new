import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Transform((value) => +value.value)
  page: number = 1;

  @IsInt()
  @IsOptional()
  @Transform((value) => +value.value)
  'page-size': number = 10;
}
