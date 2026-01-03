import { Test, TestingModule } from '@nestjs/testing';
import { SendNotificationDto } from '../../src/application/notification/dto/send-notification.dto';
import { NotificationController } from '../../src/application/notification/notification.controller';
import { NotificationService } from '../../src/application/notification/services/notification.service';

describe('NotificationController', () => {
  let controller: NotificationController;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const mockNotificationService = {
      notify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    // Arrange
    // (No setup needed for this test)

    // Act & Assert
    expect(controller).toBeDefined();
  });

  it('should call notificationService.notify and return status sent', async () => {
    // Arrange
    const dto: SendNotificationDto = {
      recipient: 'test@example.com',
      message: 'Hello',
      type: 'email',
    };
    (notificationService.notify as jest.Mock).mockResolvedValue(undefined);

    // Act
    const result = await controller.send(dto);

    // Assert
    expect(notificationService.notify).toHaveBeenCalledWith(
      dto.recipient,
      dto.message,
    );
    expect(result).toEqual({ status: 'sent' });
  });
});
