import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers';

interface GetQuestionAnswersUseCaseArguments {
  questionId: string;
  page: number;
}

interface GetQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

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

    return { answers };
  }
}
