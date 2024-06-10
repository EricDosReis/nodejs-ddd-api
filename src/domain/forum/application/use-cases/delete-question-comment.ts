import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found';
import type { QuestionCommentsRepository } from '../repositories/question-comments';

interface DeleteQuestionCommentUseCaseArguments {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseArguments): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return failure(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return success({});
  }
}
