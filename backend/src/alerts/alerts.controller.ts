import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AlertsService } from './alerts.service';
import { AlertType, AlertPriority } from './entities/alert.entity';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
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
  @ApiOperation({ summary: 'Get all alerts for user' })
  async getAlerts(
    @Req() req: Request,
    @Query('unreadOnly') unreadOnly?: boolean,
    @Query('type') type?: AlertType,
    @Query('priority') priority?: AlertPriority,
  ) {
    const userId = this.getUserIdFromRequest(req);

    if (type) {
      return this.alertsService.getAlertsByType(userId, type);
    }

    if (priority) {
      return this.alertsService.getAlertsByPriority(userId, priority);
    }

    return this.alertsService.findAll(userId, unreadOnly);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get alert by ID' })
  async getAlert(@Req() req: Request, @Param('id') alertId: string) {
    const userId = this.getUserIdFromRequest(req);
    return this.alertsService.findById(alertId, userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark alert as read' })
  async markAsRead(@Req() req: Request, @Param('id') alertId: string) {
    const userId = this.getUserIdFromRequest(req);
    return this.alertsService.markAsRead(alertId, userId);
  }

  @Patch('read-all')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all alerts as read' })
  async markAllAsRead(@Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    await this.alertsService.markAllAsRead(userId);
    return { message: 'All alerts marked as read' };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete alert' })
  async deleteAlert(@Req() req: Request, @Param('id') alertId: string) {
    const userId = this.getUserIdFromRequest(req);
    await this.alertsService.delete(alertId, userId);
    return { message: 'Alert deleted successfully' };
  }

  @Get('unread/count')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread alerts count' })
  async getUnreadCount(@Req() req: Request) {
    const userId = this.getUserIdFromRequest(req);
    const count = await this.alertsService.getUnreadCount(userId);
    return { count };
  }
}
