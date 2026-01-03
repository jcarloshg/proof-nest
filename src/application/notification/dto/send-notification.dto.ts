export class SendNotificationDto {
  recipient: string;
  message: string;
  type: 'email' | 'sms';
}
