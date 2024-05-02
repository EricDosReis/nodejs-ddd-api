import type { Pagination } from '@/core/entities/types/pagination';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers';
import type { Answer } from '@/domain/forum/enterprise/entities/answer';

const ITEMS_PER_PAGE = 20;

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.id === answer.id);

    this.items[itemIndex] = answer;
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.id === answer.id);

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string) {
    const answer = this.items.find(item => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(questionId: string, { page }: Pagination) {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return answers;
  }
}
