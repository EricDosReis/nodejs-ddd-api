import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import type { Question } from '../../enterprise/entities/question';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentWatchedList } from '../../enterprise/entities/question-attachment-watched-list';
import { QuestionAttachmentsRepository } from '../repositories/question-attachments';
import type { QuestionsRepository } from '../repositories/questions';
import { NotAllowedError } from './errors/not-allowed';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface EditQuestionUseCaseArguments {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseArguments): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    const currentQuestionAttchments =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId);

    const questionAttachmentWatchedList = new QuestionAttachmentWatchedList(
      currentQuestionAttchments,
    );

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentWatchedList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentWatchedList;

    await this.questionsRepository.save(question);

    return success({
      question,
    });
  }
}
