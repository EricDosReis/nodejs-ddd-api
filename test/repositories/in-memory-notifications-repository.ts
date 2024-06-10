import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications';
import type { Notification } from '@/domain/notification/enterprise/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }
}