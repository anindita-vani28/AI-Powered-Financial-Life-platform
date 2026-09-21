import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  getAlerts() {
    return this.alertsService.getAlerts();
  }

  @Patch(':id')
  markAsRead(@Param('id') alertId: string) {
    return this.alertsService.markAsRead(alertId);
  }

  @Patch('read-all')
  markAllAsRead() {
    return this.alertsService.markAllAsRead();
  }

  @Delete(':id')
  deleteAlert(@Param('id') alertId: string) {
    return this.alertsService.deleteAlert(alertId);
  }
}
