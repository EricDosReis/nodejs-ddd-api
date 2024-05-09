import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetRecentQuestionsUseCase } from './get-recent-questions';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetRecentQuestionsUseCase;

describe('Get Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );

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

    const { value } = await sut.execute({ page: 1 });

    expect(value?.questions).toEqual([
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

    const { value: firstPageData } = await sut.execute({ page: 1 });

    expect(firstPageData?.questions).toHaveLength(20);

    const { value: secondPageData } = await sut.execute({ page: 2 });

    expect(secondPageData?.questions).toHaveLength(2);
  });
});
