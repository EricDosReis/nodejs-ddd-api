import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found';
import type { Question } from '../../enterprise/entities/question';
import type { AnswersRepository } from '../repositories/answers';
import type { QuestionsRepository } from '../repositories/questions';

interface ChooseQuestionBestAnswerUseCaseArguments {
  answerId: string;
  authorID: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

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
      return failure(new ResourceNotFoundError());
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (authorID !== question.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return success({
      question,
    });
  }
}
