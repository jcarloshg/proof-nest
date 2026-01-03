import { Injectable } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification-service.interface';

@Injectable()
export class SmsNotificationService implements INotificationService {
  async send(recipient: string, message: string): Promise<void> {
    // ...send SMS logic
    console.log(`SMS sent to ${recipient}: ${message}`);
  }
}
