import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { GetQuestionAnswersUseCase } from './get-question-answers';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: GetQuestionAnswersUseCase;

describe('Get Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new GetQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it('should get question answers', async () => {
    const questionId = new UniqueEntityID('question-1');

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId,
      }),
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId,
      }),
    );

    const { answers } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    });

    expect(answers).toHaveLength(2);
  });

  it('should get paginated question answers', async () => {
    const questionId = new UniqueEntityID('question-1');

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId,
        }),
      );
    }

    const { answers } = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
