import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import type { QuestionComment } from '../../enterprise/entities/question-comment';
import type { QuestionCommentsRepository } from '../repositories/question-comments';

interface GetQuestionCommentsUseCaseArguments {
  questionId: string;
  page: number;
}

type GetQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;

export class GetQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: GetQuestionCommentsUseCaseArguments): Promise<GetQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return success({ questionComments });
  }
}
