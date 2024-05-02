import type { Pagination } from '@/core/entities/types/pagination';
import type { Question } from '../../enterprise/entities/question';

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  findManyRecent(pagination: Pagination): Promise<Question[]>;
}
