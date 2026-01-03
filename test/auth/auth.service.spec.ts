import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/application/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should register a new user', () => {
      // Arrange
      // (No setup needed for this test)

      // Act
      const result = service.signUp('testuser', 'testpass');

      // Assert
      expect(result).toEqual({ message: 'User registered successfully' });
    });

    it('should not register an existing user', () => {
      // Arrange
      service.signUp('testuser', 'testpass');

      // Act
      const result = service.signUp('testuser', 'testpass');

      // Assert
      expect(result).toEqual({ message: 'User already exists' });
    });
  });

  describe('login', () => {
    it('should login with correct credentials', () => {
      // Arrange
      service.signUp('testuser', 'testpass');

      // Act
      const result = service.login('testuser', 'testpass');

      // Assert
      expect(result).toEqual({ message: 'Login successful' });
    });

    it('should not login with incorrect credentials', () => {
      // Arrange
      service.signUp('testuser', 'testpass');

      // Act
      const result = service.login('testuser', 'wrongpass');

      // Assert
      expect(result).toEqual({ message: 'Invalid credentials' });
    });

    it('should not login if user does not exist', () => {
      // Arrange
      // (No setup needed for this test)

      // Act
      const result = service.login('nouser', 'nopass');

      // Assert
      expect(result).toEqual({ message: 'Invalid credentials' });
    });
  });
});
