import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertsService {
  private readonly alerts = [
    {
      id: 'alert-1',
      title: 'Insurance renewal due in 10 days',
      message: 'Your auto policy renews on October 1. Review your coverage options.',
      type: 'insurance',
      unread: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'alert-2',
      title: 'Tax filing reminder',
      message: 'Tax documents are missing for the 2025 filing season.',
      type: 'tax',
      unread: false,
      createdAt: new Date().toISOString(),
    },
  ];

  getAlerts() {
    return this.alerts;
  }

  markAsRead(alertId: string) {
    return {
      success: true,
      message: `Alert ${alertId} marked as read`,
    };
  }

  markAllAsRead() {
    return {
      success: true,
      message: 'All alerts marked as read',
    };
  }

  deleteAlert(alertId: string) {
    return {
      success: true,
      message: `Alert ${alertId} deleted`,
    };
  }
}
