import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetRecentQuestionsUseCase } from './get-recent-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetRecentQuestionsUseCase;

describe('Get Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should get recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 0, 20),
      }),
    );

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 0, 18),
      }),
    );

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 0, 23),
      }),
    );

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 0, 23),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 20),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 18),
      }),
    ]);
  });

  it('should get paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions: firstPageQuestions } = await sut.execute({ page: 1 });

    expect(firstPageQuestions).toHaveLength(20);

    const { questions: secondPageQuestions } = await sut.execute({ page: 2 });

    expect(secondPageQuestions).toHaveLength(2);
  });
});
