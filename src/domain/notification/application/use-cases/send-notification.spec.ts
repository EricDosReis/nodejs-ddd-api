import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should send a notification', async () => {
    const { value } = await sut.execute({
      recipientId: '1',
      title: 'This is my notification',
      content: 'Notification content',
    });

    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      value?.notification,
    );
  });
});
