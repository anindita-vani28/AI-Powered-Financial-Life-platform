import { IsString, IsEmail, IsUUID, IsEnum } from 'class-validator';

enum UserRole {
  CONSUMER = 'consumer',
  PROFESSIONAL = 'professional',
}

export class UserDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsEnum(UserRole)
  role: UserRole;

  createdAt: Date;
}

export class AuthResponseDto {
  user: UserDto;

  @IsString()
  token: string;

  @IsString()
  refreshToken?: string;
}
