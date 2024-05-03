import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import type { AnswerCommentsRepository } from '../repositories/answer-comments';
import type { AnswersRepository } from '../repositories/answers';

interface CommentOnAnswerUseCaseArguments {
  content: string;
  authorId: string;
  answerId: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    content,
    authorId,
    answerId,
  }: CommentOnAnswerUseCaseArguments): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found.');
    }

    const answerComment = AnswerComment.create({
      content,
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
    });

    await this.answerCommentsRepository.create(answerComment);

    return { answerComment };
  }
}
