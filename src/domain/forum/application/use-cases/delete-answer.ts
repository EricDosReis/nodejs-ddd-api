import type { AnswersRepository } from '../repositories/answers';

interface DeleteAnswerUseCaseArguments {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseArguments): Promise<void> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error('Question not found.');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Permission denied, you are not the answer's owner.");
    }

    await this.answerRepository.delete(answer);
  }
}
