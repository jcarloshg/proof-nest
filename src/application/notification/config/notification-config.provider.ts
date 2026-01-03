import { Provider } from '@nestjs/common';
import { EmailNotificationService } from '../services/email-notification.service';
import { SmsNotificationService } from '../services/sms-notification.service';
import { INotificationService } from '../interfaces/notification-service.interface';

// Dynamic provider using useFactory to select implementation based on ENV
export const NotificationServiceProvider: Provider = {
  provide: 'INotificationService',
  useFactory: () => {
    // Example: choose implementation based on process.env.NOTIFICATION_TYPE
    if (process.env.NOTIFICATION_TYPE === 'sms') {
      return new SmsNotificationService();
    }
    // Default to email
    return new EmailNotificationService();
  },
};
