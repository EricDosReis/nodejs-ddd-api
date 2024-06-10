import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { makeAnswer } from 'test/factories/make-answer';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );

    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should delete an answer', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-1';

    inMemoryAnswersRepository.items = [
      makeAnswer(
        { authorId: new UniqueEntityID(authorId) },
        new UniqueEntityID(answerId),
      ),
    ];

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: new UniqueEntityID(answerId),
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: new UniqueEntityID(answerId),
        attachmentId: new UniqueEntityID('2'),
      }),
    );

    await sut.execute({ authorId, answerId });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete an answer from another user', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-1';

    inMemoryAnswersRepository.items = [
      makeAnswer(
        { authorId: new UniqueEntityID('author-2') },
        new UniqueEntityID(answerId),
      ),
    ];

    const result = await sut.execute({ authorId, answerId });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
