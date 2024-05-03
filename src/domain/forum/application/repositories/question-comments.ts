import type { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(questionCommentId: string): Promise<QuestionComment | null>;
  delete(question: QuestionComment): Promise<void>;
}
