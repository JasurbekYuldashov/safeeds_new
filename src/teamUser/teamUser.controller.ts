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
import { TeamUserService } from './teamUser.service';
import { CreateTeamUserDto, UpdateTeamUserDto } from 'dtos';

@Controller('team-user')
export class TeamUserController {
  constructor(private readonly teamUserService: TeamUserService) {}

  @Get('/')
  async getAll() {
    const data = await this.teamUserService.getAll();
    return { data, statusCode: HttpStatus.OK };
  }

  @Post('/')
  async save(@Body() body: CreateTeamUserDto) {
    const data = await this.teamUserService.save(body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTeamUserDto,
  ) {
    const data = await this.teamUserService.update(id, body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.teamUserService.getOne(id);
    return { data, statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.teamUserService.deleteOne(id);
    return { data, statusCode: HttpStatus.OK };
  }
}
