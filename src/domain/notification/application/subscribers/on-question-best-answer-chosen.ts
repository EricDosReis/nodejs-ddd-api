import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers';
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    );
  }

  private async sendQuestionBestAnswerChosenNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Your answer was chosen!"',
        content: `The answer you sent on "${question.title.substring(0, 20).concat('...')}" was chosen as the best answer by the author.`,
      });
    }
  }
}
