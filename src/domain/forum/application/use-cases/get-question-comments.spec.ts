import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { GetQuestionCommentsUseCase } from './get-question-comments';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: GetQuestionCommentsUseCase;

describe('Get Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new GetQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should get question comments', async () => {
    const questionId = new UniqueEntityID('question-1');

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId,
      }),
    );

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId,
      }),
    );

    const { value } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    });

    expect(value?.questionComments).toHaveLength(2);
  });

  it('should get paginated question comments', async () => {
    const questionId = new UniqueEntityID('question-1');

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId,
        }),
      );
    }

    const { value } = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    });

    expect(value?.questionComments).toHaveLength(2);
  });
});
