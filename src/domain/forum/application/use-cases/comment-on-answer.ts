import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import type { AnswerCommentsRepository } from '../repositories/answer-comments';
import type { AnswersRepository } from '../repositories/answers';

interface CommentOnAnswerUseCaseArguments {
  content: string;
  authorId: string;
  answerId: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    content,
    authorId,
    answerId,
  }: CommentOnAnswerUseCaseArguments): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return failure(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      content,
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
    });

    await this.answerCommentsRepository.create(answerComment);

    return success({ answerComment });
  }
}
