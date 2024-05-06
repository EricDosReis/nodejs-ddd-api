import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import type { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface GetQuestionBySlugUseCaseArguments {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseArguments): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    return success({ question });
  }
}
