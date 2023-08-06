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
import { TeamUserReviewService } from './teamUserReview.service';
import { CreateTeamReviewDto, UpdateTeamReviewDto } from 'dtos';

@Controller('team-user-review')
export class TeamUserReviewController {
  constructor(private readonly teamUserReviewService: TeamUserReviewService) {}

  @Get('/')
  async getAll() {
    const data = await this.teamUserReviewService.getAll();
    return { data, statusCode: HttpStatus.OK };
  }

  @Post('/')
  async save(@Body() body: CreateTeamReviewDto) {
    const data = await this.teamUserReviewService.save(body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTeamReviewDto,
  ) {
    const data = await this.teamUserReviewService.update(id, body);
    return { data, statusCode: HttpStatus.OK };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.teamUserReviewService.getOne(id);
    return { data, statusCode: HttpStatus.OK };
  }

  @Get('/by-team-user/:id')
  async getByTeamUser(@Param('id', ParseIntPipe) id: number) {
    const data = await this.teamUserReviewService.getByTeamUser(id);
    return { data, statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.teamUserReviewService.deleteOne(id);
    return { data, statusCode: HttpStatus.OK };
  }
}
