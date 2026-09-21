import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
    }),
  ],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
