import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import type { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';

interface GetRecentQuestionsUseCaseArguments {
  page: number;
}

type GetRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

export class GetRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: GetRecentQuestionsUseCaseArguments): Promise<GetRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return success({ questions });
  }
}
