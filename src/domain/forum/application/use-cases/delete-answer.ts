import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import type { AnswersRepository } from '../repositories/answers';
import { NotAllowedError } from './errors/not-allowed';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface DeleteAnswerUseCaseArguments {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseArguments): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return failure(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return failure(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return success({});
  }
}
