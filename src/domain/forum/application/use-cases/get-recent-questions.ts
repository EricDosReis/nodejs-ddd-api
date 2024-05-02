import { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';

interface GetRecentQuestionsUseCaseArguments {
  page: number;
}

interface GetRecentQuestionsUseCaseResponse {
  questions: Question[];
}

export class GetRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: GetRecentQuestionsUseCaseArguments): Promise<GetRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return { questions };
  }
}
