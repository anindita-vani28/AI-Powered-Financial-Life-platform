import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('should allow a logout request without throwing', async () => {
    const jwtService = new JwtService({ secret: 'test-secret' });
    const service = new AuthService(jwtService);

    await expect(service.logout('Bearer demo-token')).resolves.toEqual({
      success: true,
      message: 'Logged out successfully',
    });
  });
});
