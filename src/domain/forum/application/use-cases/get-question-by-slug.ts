import { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';

interface GetQuestionBySlugUseCaseArguments {
  slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseArguments): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error('Question not found');
    }

    return { question };
  }
}
