import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthScore } from './entities/health-score.entity';
import { CreateHealthScoreDto } from './dto/create-health-score.dto';

@Injectable()
export class HealthScoreService {
  constructor(
    @InjectRepository(HealthScore)
    private healthScoreRepository: Repository<HealthScore>,
  ) {}

  async create(userId: string, createHealthScoreDto: CreateHealthScoreDto): Promise<HealthScore> {
    const healthScore = this.healthScoreRepository.create({
      ...createHealthScoreDto,
      userId,
    });
    return await this.healthScoreRepository.save(healthScore);
  }

  async getCurrentScore(userId: string): Promise<HealthScore> {
    const healthScore = await this.healthScoreRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    if (!healthScore) {
      return await this.createDefaultScore(userId);
    }

    return healthScore;
  }

  async getScoreHistory(userId: string, limit: number = 12): Promise<HealthScore[]> {
    return await this.healthScoreRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async refreshScore(userId: string, createHealthScoreDto: CreateHealthScoreDto): Promise<HealthScore> {
    const currentScore = await this.getCurrentScore(userId);

    const newScore = this.healthScoreRepository.create({
      ...createHealthScoreDto,
      userId,
      previousScore: currentScore.overallScore,
    });

    return await this.healthScoreRepository.save(newScore);
  }

  async getScoreTrend(userId: string, months: number = 6) {
    const scores = await this.healthScoreRepository.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });

    return scores.map((score) => ({
      date: score.createdAt,
      score: score.overallScore,
    }));
  }

  async getScoreComparison(userId: string) {
    const currentScore = await this.getCurrentScore(userId);

    return {
      current: currentScore.overallScore,
      previous: currentScore.previousScore || 0,
      change: currentScore.overallScore - (currentScore.previousScore || 0),
    };
  }

  async getTopOpportunities(userId: string, limit: number = 5) {
    const currentScore = await this.getCurrentScore(userId);

    return currentScore.opportunities
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, limit);
  }

  private async createDefaultScore(userId: string): Promise<HealthScore> {
    const defaultScore = this.healthScoreRepository.create({
      userId,
      overallScore: 50,
      breakdown: {
        insurance: { score: 50, status: 'incomplete' },
        tax: { score: 50, status: 'incomplete' },
        credit: { score: 50, status: 'not_verified', trend: 'stable' },
        claims: { score: 50, status: 'none' },
        documents: { score: 50, totalCount: 0, organized: 0 },
      },
      opportunities: [],
    });

    return await this.healthScoreRepository.save(defaultScore);
  }
}
