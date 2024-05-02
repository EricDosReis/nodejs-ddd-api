import { Question } from '../../enterprise/entities/question';
import type { AnswersRepository } from '../repositories/answers';
import { QuestionsRepository } from '../repositories/questions';

interface ChooseQuestionBestAnswerUseCaseArguments {
  answerId: string;
  authorID: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorID,
  }: ChooseQuestionBestAnswerUseCaseArguments): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorID !== question.authorId.toString()) {
      throw new Error('Not allowed, you are not the author of the question');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
