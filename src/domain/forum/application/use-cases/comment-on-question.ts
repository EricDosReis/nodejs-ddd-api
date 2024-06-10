import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import type { QuestionCommentsRepository } from '../repositories/question-comments';
import type { QuestionsRepository } from '../repositories/questions';

interface CommentOnQuestionUseCaseArguments {
  content: string;
  authorId: string;
  questionId: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    content,
    authorId,
    questionId,
  }: CommentOnQuestionUseCaseArguments): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.questionCommentsRepository.create(questionComment);

    return success({ questionComment });
  }
}
