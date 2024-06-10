import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found';
import type { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';

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
