import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found';
import type { AnswerCommentsRepository } from '../repositories/answer-comments';

interface DeleteAnswerCommentUseCaseArguments {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseArguments): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return failure(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({});
  }
}
