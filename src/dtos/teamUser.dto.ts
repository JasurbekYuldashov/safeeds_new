import { Gender } from '@prisma/client';
import { IsOptional, IsString, IsDate, IsDateString } from 'class-validator';

export class CreateTeamUserDto {
  @IsString()
  firstname: string;

  @IsString()
  username: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  hobbies: string;

  @IsString()
  gender: Gender;

  @IsString()
  @IsOptional()
  employeeInfo: string;

  @IsDateString()
  employeeSince: Date;
}

export class UpdateTeamUserDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  hobbies: string;

  @IsOptional()
  @IsString()
  gender: Gender;

  @IsString()
  @IsOptional()
  employeeInfo: string;

  @IsOptional()
  @IsDateString()
  employeeSince: Date;
}
