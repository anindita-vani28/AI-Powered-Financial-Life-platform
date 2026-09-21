import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { HealthScoreService } from './health-score.service';
import { CreateHealthScoreDto } from './dto/create-health-score.dto';

@ApiTags('health-score')
@Controller('health-score')
export class HealthScoreController {
  constructor(
    private readonly healthScoreService: HealthScoreService,
    private readonly jwtService: JwtService,
  ) {}

  private getUserIdFromRequest(req: Request): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '');
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'dev-secret',
      });
      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current health score' })
  async getHealthScore(@Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    return this.healthScoreService.getCurrentScore(userId);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh/recalculate health score' })
  async refreshHealthScore(
    @Req() req: Request,
    @Body() createHealthScoreDto: CreateHealthScoreDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.healthScoreService.refreshScore(userId, createHealthScoreDto);
  }

  @Get('history')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get health score history' })
  async getHistory(@Req() req: Request, @Query('limit') limit?: string) {
    const userId = this.getUserIdFromRequest(req);
    const limitNum = limit ? Number(limit) : 12;
    return this.healthScoreService.getScoreHistory(userId, limitNum);
  }

  @Get('trend')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get health score trend' })
  async getTrend(@Req() req: Request, @Query('months') months?: string) {
    const userId = this.getUserIdFromRequest(req);
    const monthsNum = months ? Number(months) : 6;
    return this.healthScoreService.getScoreTrend(userId, monthsNum);
  }

  @Get('comparison')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get score comparison with previous' })
  async getComparison(@Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    return this.healthScoreService.getScoreComparison(userId);
  }

  @Get('opportunities')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get top opportunities' })
  async getOpportunities(@Req() req: Request, @Query('limit') limit?: string) {
    const userId = this.getUserIdFromRequest(req);
    const limitNum = limit ? Number(limit) : 5;
    return this.healthScoreService.getTopOpportunities(userId, limitNum);
  }
}
