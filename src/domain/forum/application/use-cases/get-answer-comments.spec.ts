import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { GetAnswerCommentsUseCase } from './get-answer-comments';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: GetAnswerCommentsUseCase;

describe('Get Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new GetAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should get answer comments', async () => {
    const answerId = new UniqueEntityID('answer-1');

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId,
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId,
      }),
    );

    const { value } = await sut.execute({
      answerId: answerId.toString(),
      page: 1,
    });

    expect(value?.answerComments).toHaveLength(2);
  });

  it('should get paginated answer comments', async () => {
    const answerId = new UniqueEntityID('answer-1');

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId,
        }),
      );
    }

    const { value } = await sut.execute({
      answerId: answerId.toString(),
      page: 2,
    });

    expect(value?.answerComments).toHaveLength(2);
  });
});
