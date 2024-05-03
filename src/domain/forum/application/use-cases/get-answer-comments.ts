import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments';

interface GetAnswerCommentsUseCaseArguments {
  answerId: string;
  page: number;
}

interface GetAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

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

    return { answerComments };
  }
}
