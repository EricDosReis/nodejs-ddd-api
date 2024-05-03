import { AnswerCommentsRepository } from '../repositories/answer-comments';

interface DeleteAnswerCommentUseCaseArguments {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseArguments): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error('Answer comment not found.');
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error(
        'Permission denied, you are not the author of the answer comment.',
      );
    }

    await this.answerCommentsRepository.delete(answerComment);
  }
}
