import { Injectable } from '@nestjs/common';
import { INotificationService } from '../interfaces/notification-service.interface';

@Injectable()
export class EmailNotificationService implements INotificationService {
  async send(recipient: string, message: string): Promise<void> {
    // ...send email logic
    console.log(`Email sent to ${recipient}: ${message}`);
  }
}
