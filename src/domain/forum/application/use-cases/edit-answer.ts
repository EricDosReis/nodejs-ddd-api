import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers';

interface EditAnswerUseCaseArguments {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseArguments): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found.');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error(
        'Permission denied, you are not the author of the answer.',
      );
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return {
      answer,
    };
  }
}
