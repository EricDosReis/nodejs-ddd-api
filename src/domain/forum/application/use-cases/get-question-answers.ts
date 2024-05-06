import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers';

interface GetQuestionAnswersUseCaseArguments {
  questionId: string;
  page: number;
}

type GetQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class GetQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: GetQuestionAnswersUseCaseArguments): Promise<GetQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return success({ answers });
  }
}
