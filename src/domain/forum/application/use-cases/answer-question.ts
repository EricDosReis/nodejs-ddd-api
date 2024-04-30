import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers';

interface AnswerQuestionUseCaseArguments {
  instructorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseArguments): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: instructorId,
      questionId,
    });

    await this.answerRepository.create(answer);

    return { answer };
  }
}
