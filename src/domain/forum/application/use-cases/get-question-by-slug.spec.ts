import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should get a question by slug', async () => {
    const title = 'Example question';

    const newQuestion = Question.create({
      title,
      slug: Slug.createFromText(title),
      authorId: new UniqueEntityID(),
      content: 'Question content',
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({ slug: newQuestion.slug.value });

    expect(question.content).toEqual(newQuestion.content);
  });
});
