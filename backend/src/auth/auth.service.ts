import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password-reset.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = this.usersRepository.create({
      email: email.toLowerCase(),
      name,
      passwordHash,
      role: UserRole.CONSUMER,
    });

    const savedUser = await this.usersRepository.save(user);

    // Generate tokens
    const { token, refreshToken } = await this.generateTokens(savedUser);

    return {
      user: this.toUserDto(savedUser),
      token,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const { token, refreshToken } = await this.generateTokens(user);

    return {
      user: this.toUserDto(user),
      token,
      refreshToken,
    };
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  async getCurrentUser(token: string) {
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    const accessToken = token.replace(/^Bearer\s+/i, '');
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      const user = await this.validateUser(payload.sub);
      return this.toUserDto(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.validateUser(payload.sub);
      const { token } = await this.generateTokens(user);
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout() {
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async requestPasswordReset(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;

    const user = await this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // For security, don't reveal if email exists
      return;
    }

    // Generate reset token
    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'password-reset' },
      { expiresIn: '1h' },
    );

    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.usersRepository.update(user.id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    // TODO: Send email with reset link
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, password } = resetPasswordDto;

    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (payload.type !== 'password-reset') {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.passwordResetToken !== token) {
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      if (user.passwordResetExpires < new Date()) {
        throw new UnauthorizedException('Reset token has expired');
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(password, 10);

      // Update user
      await this.usersRepository.update(user.id, {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (payload.type !== 'email-verify') {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.emailVerificationToken !== token) {
        throw new NotFoundException('User not found');
      }

      await this.usersRepository.update(user.id, {
        emailVerified: true,
        emailVerificationToken: null,
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    return { token, refreshToken };
  }

  private toUserDto(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
