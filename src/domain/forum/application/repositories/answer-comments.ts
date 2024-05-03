import type { Pagination } from '@/core/types/pagination';
import type { AnswerComment } from '../../enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
  create(answer: AnswerComment): Promise<void>;
  findById(answerCommentId: string): Promise<AnswerComment | null>;
  delete(answer: AnswerComment): Promise<void>;
  findManyByAnswerId(
    questionId: string,
    pagination: Pagination,
  ): Promise<AnswerComment[]>;
}
