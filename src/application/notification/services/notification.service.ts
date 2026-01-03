import { Inject, Injectable } from '@nestjs/common';
import type { INotificationService } from '../interfaces/notification-service.interface';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('INotificationService')
    private readonly notificationService: INotificationService,
  ) {}

  async notify(recipient: string, message: string) {
    await this.notificationService.send(recipient, message);
  }
}
