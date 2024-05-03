import { Pagination } from '@/core/types/pagination';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

const ITEMS_PER_PAGE = 20;

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      item => item.id === answerComment.id,
    );

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string) {
    const answerComment = this.items.find(item => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async findManyByAnswerId(answerId: string, { page }: Pagination) {
    const answerComments = this.items
      .filter(item => item.answerId.toString() === answerId)
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return answerComments;
  }
}
