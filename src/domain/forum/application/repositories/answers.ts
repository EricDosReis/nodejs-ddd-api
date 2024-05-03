import type { Pagination } from '@/core/types/pagination';
import type { Answer } from '../../enterprise/entities/answer';

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    pagination: Pagination,
  ): Promise<Answer[]>;
}
