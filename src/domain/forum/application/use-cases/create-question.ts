import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import { Question } from '../../enterprise/entities/question';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentWatchedList } from '../../enterprise/entities/question-attachment-watched-list';
import type { QuestionsRepository } from '../repositories/questions';

interface CreateQuestionUseCaseArguments {
  title: string;
  content: string;
  attachmentsIds: string[];
  authorId: UniqueEntityID;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    content,
    attachmentsIds,
    authorId,
  }: CreateQuestionUseCaseArguments): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId,
    });

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentWatchedList(
      questionAttachments,
    );

    await this.questionsRepository.create(question);

    return success({ question });
  }
}
