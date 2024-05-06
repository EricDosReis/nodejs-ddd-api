import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import type { QuestionsRepository } from '../repositories/questions';
import { NotAllowedError } from './errors/not-allowed';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface DeleteQuestionUseCaseArguments {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseArguments): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError());
    }

    await this.questionsRepository.delete(question);

    return success({});
  }
}
