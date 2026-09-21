import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthScoreService {
  getHealthScore() {
    const now = new Date().toISOString();

    return {
      id: 'health-score-demo',
      userId: 'demo-user',
      overallScore: 84,
      breakdown: {
        insurance: {
          score: 88,
          status: 'Healthy',
          gaps: ['Review umbrella coverage'],
        },
        tax: {
          score: 78,
          status: 'On track',
          missingDocs: 2,
        },
        credit: {
          score: 81,
          trend: 'up',
          recentChanges: 4,
        },
        claims: {
          score: 72,
          pending: 1,
          resolved: 6,
        },
        documents: {
          score: 91,
          totalCount: 18,
          organized: 16,
        },
      },
      opportunities: [
        {
          id: 'opp-1',
          type: 'deduction',
          title: 'Tax deduction review',
          description: 'Your current filing profile suggests a possible deduction review before quarter-end.',
          impact: 'Could reduce annual tax burden by 3-5%',
          priority: 'medium',
          action: 'Upload recent tax documents',
        },
        {
          id: 'opp-2',
          type: 'coverage',
          title: 'Policy coverage gap',
          description: 'Home and auto coverage are under-matched relative to recent expense trends.',
          impact: 'Protects against uninsured risk exposure',
          priority: 'high',
          action: 'Review umbrella coverage',
        },
      ],
      updatedAt: now,
    };
  }

  refreshHealthScore() {
    return {
      ...this.getHealthScore(),
      overallScore: 86,
      updatedAt: new Date().toISOString(),
    };
  }

  getHistory(limit = 12) {
    return Array.from({ length: Math.min(limit, 6) }, (_, index) => ({
      id: `score-${index + 1}`,
      score: 74 + index * 3,
      date: new Date(Date.now() - index * 86400000).toISOString(),
    }));
  }
}
