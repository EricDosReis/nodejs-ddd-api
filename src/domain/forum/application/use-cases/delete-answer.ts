import type { AnswersRepository } from '../repositories/answers';

interface DeleteAnswerUseCaseArguments {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseArguments): Promise<void> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Question not found.');
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error(
        'Permission denied, you are not the author of the answer.',
      );
    }

    await this.answersRepository.delete(answer);
  }
}
