import { QuestionCommentsRepository } from '../repositories/question-comments';

interface DeleteQuestionCommentUseCaseArguments {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseArguments): Promise<void> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error('Question comment not found.');
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error(
        'Permission denied, you are not the author of the question comment.',
      );
    }

    await this.questionCommentsRepository.delete(questionComment);
  }
}
