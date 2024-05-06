import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import type { AnswerComment } from '../../enterprise/entities/answer-comment';
import type { AnswerCommentsRepository } from '../repositories/answer-comments';

interface GetAnswerCommentsUseCaseArguments {
  answerId: string;
  page: number;
}

type GetAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class GetAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: GetAnswerCommentsUseCaseArguments): Promise<GetAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return success({ answerComments });
  }
}
