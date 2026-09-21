import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert, AlertType, AlertPriority } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
  ) {}

  async create(userId: string, createAlertDto: CreateAlertDto): Promise<Alert> {
    const alert = this.alertsRepository.create({
      ...createAlertDto,
      userId,
    });
    return await this.alertsRepository.save(alert);
  }

  async findAll(userId: string, unreadOnly: boolean = false) {
    const query = this.alertsRepository.createQueryBuilder('alert')
      .where('alert.userId = :userId', { userId })
      .andWhere('alert.isActive = :isActive', { isActive: true });

    if (unreadOnly) {
      query.andWhere('alert.read = :read', { read: false });
    }

    return await query.orderBy('alert.createdAt', 'DESC').getMany();
  }

  async findById(alertId: string, userId: string): Promise<Alert> {
    const alert = await this.alertsRepository.findOne({
      where: { id: alertId, userId, isActive: true },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    return alert;
  }

  async markAsRead(alertId: string, userId: string): Promise<Alert> {
    const alert = await this.findById(alertId, userId);
    alert.read = true;
    return await this.alertsRepository.save(alert);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.alertsRepository.update(
      { userId, read: false, isActive: true },
      { read: true },
    );
  }

  async delete(alertId: string, userId: string): Promise<void> {
    const alert = await this.findById(alertId, userId);
    await this.alertsRepository.update(alert.id, { isActive: false });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.alertsRepository.count({
      where: { userId, read: false, isActive: true },
    });
  }

  async getAlertsByType(userId: string, type: AlertType) {
    return await this.alertsRepository.find({
      where: { userId, type, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getAlertsByPriority(userId: string, priority: AlertPriority) {
    return await this.alertsRepository.find({
      where: { userId, priority, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
