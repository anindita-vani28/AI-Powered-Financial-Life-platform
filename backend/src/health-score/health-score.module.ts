import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { HealthScoreController } from './health-score.controller';
import { HealthScoreService } from './health-score.service';
import { HealthScore } from './entities/health-score.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthScore]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
    }),
  ],
  controllers: [HealthScoreController],
  providers: [HealthScoreService],
  exports: [HealthScoreService],
})
export class HealthScoreModule {}
