import type { Pagination } from '@/core/types/pagination';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions';
import type { Question } from '@/domain/forum/enterprise/entities/question';

const ITEMS_PER_PAGE = 20;

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question) {
    this.items.push(question);
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id);

    this.items[itemIndex] = question;
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id);

    this.items.splice(itemIndex, 1);

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async findManyRecent({ page }: Pagination) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return questions;
  }
}
