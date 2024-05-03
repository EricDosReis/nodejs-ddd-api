import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments';

interface GetQuestionCommentsUseCaseArguments {
  questionId: string;
  page: number;
}

interface GetQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

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

    return { questionComments };
  }
}
