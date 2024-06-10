import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { faker } from '@faker-js/faker';
import { makeAnswer } from 'test/factories/make-answer';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { EditAnswerUseCase } from './edit-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );

    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    );
  });

  it('should edit an answer', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-1';
    const content = faker.lorem.text();

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

    await sut.execute({
      authorId,
      answerId,
      content,
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content,
    });

    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);

    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
      ],
    );
  });

  it('should be able to edit a answer from another user', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-1';
    const content = faker.lorem.text();

    inMemoryAnswersRepository.items = [
      makeAnswer(
        { authorId: new UniqueEntityID('author-2') },
        new UniqueEntityID(answerId),
      ),
    ];

    const result = await sut.execute({
      authorId,
      answerId,
      content,
      attachmentsIds: [],
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
