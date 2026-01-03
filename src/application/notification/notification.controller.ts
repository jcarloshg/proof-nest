import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async send(@Body() dto: SendNotificationDto) {
    await this.notificationService.notify(dto.recipient, dto.message);
    return { status: 'sent' };
  }
}
