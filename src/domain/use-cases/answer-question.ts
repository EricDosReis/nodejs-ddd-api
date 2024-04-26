import { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answers";

interface AnswerQuestionUseCaseArguments {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseArguments) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answerRepository.create(answer);

    return answer;
  }
}
