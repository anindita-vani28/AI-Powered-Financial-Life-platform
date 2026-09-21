import { IsString, IsEnum, IsOptional } from 'class-validator';
import { AlertType, AlertPriority } from '../entities/alert.entity';

export class CreateAlertDto {
  @IsEnum(AlertType)
  type: AlertType;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(AlertPriority)
  @IsOptional()
  priority?: AlertPriority;

  @IsOptional()
  @IsString()
  actionUrl?: string;

  @IsOptional()
  @IsString()
  relatedEntityId?: string;
}
