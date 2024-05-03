import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(answer: QuestionComment) {
    this.items.push(answer);
  }
}
