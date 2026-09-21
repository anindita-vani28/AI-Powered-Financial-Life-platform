import { Controller, Get, Post, Query } from '@nestjs/common';
import { HealthScoreService } from './health-score.service';

@Controller('health-score')
export class HealthScoreController {
  constructor(private readonly healthScoreService: HealthScoreService) {}

  @Get()
  getHealthScore() {
    return this.healthScoreService.getHealthScore();
  }

  @Post('refresh')
  refreshHealthScore() {
    return this.healthScoreService.refreshHealthScore();
  }

  @Get('history')
  getHistory(@Query('limit') limit?: string) {
    return this.healthScoreService.getHistory(limit ? Number(limit) : 12);
  }
}
