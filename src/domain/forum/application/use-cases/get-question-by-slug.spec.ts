import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should get a question by slug', async () => {
    const newQuestion = makeQuestion({
      content: 'Question content',
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({ slug: newQuestion.slug.value });

    expect(question.content).toEqual(newQuestion.content);
  });
});
