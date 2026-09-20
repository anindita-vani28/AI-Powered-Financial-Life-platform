import api from './api';
import { Alert } from '@/types';

export const alertService = {
  async getAlerts(unreadOnly: boolean = false): Promise<Alert[]> {
    const params = unreadOnly ? { unread: true } : {};
    const { data } = await api.get('/alerts', { params });
    return data;
  },

  async markAsRead(alertId: string): Promise<void> {
    await api.patch(`/alerts/${alertId}`, { read: true });
  },

  async markAllAsRead(): Promise<void> {
    await api.patch('/alerts/read-all');
  },

  async deleteAlert(alertId: string): Promise<void> {
    await api.delete(`/alerts/${alertId}`);
  },
};
