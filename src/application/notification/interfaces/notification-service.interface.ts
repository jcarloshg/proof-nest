// Abstract interface for notification service
export interface INotificationService {
  send(recipient: string, message: string): Promise<void>;
}
