import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './services/notification.service';
import { LoggerService } from './services/logger.service';
import { NotificationServiceProvider } from './config/notification-config.provider';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    LoggerService,
    NotificationServiceProvider, // Dynamic provider (useFactory)
    // You could also use useClass for static binding:
    // { provide: 'INotificationService', useClass: EmailNotificationService },
  ],
})
export class NotificationModule {}
