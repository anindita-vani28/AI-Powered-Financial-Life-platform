import api from './api';
import { FinancialHealthScore } from '@/types';

export const healthScoreService = {
  async getHealthScore(): Promise<FinancialHealthScore> {
    const { data } = await api.get('/health-score');
    return data;
  },

  async refreshHealthScore(): Promise<FinancialHealthScore> {
    const { data } = await api.post('/health-score/refresh');
    return data;
  },

  async getHealthScoreHistory(limit: number = 12) {
    const { data } = await api.get(`/health-score/history?limit=${limit}`);
    return data;
  },
};
