import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { GetQuestionAnswersUseCase } from './get-question-answers';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: GetQuestionAnswersUseCase;

describe('Get Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );

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

    const { value } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    });

    expect(value?.answers).toHaveLength(2);
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

    const { value } = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    });

    expect(value?.answers).toHaveLength(2);
  });
});
