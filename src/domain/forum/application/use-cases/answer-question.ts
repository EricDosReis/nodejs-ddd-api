import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers';

interface AnswerQuestionUseCaseArguments {
  instructorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

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

    return success({ answer });
  }
}
