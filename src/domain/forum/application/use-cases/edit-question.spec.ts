import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { faker } from '@faker-js/faker';
import { makeQuestion } from 'test/factories/make-question';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    );
  });

  it('should edit a question', async () => {
    const questionId = 'question-1';
    const authorId = 'author-1';
    const title = faker.lorem.sentence();
    const content = faker.lorem.text();

    inMemoryQuestionsRepository.items = [
      makeQuestion(
        { authorId: new UniqueEntityID(authorId) },
        new UniqueEntityID(questionId),
      ),
    ];

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: new UniqueEntityID(questionId),
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: new UniqueEntityID(questionId),
        attachmentId: new UniqueEntityID('2'),
      }),
    );

    await sut.execute({
      authorId,
      questionId,
      title,
      content,
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title,
      content,
    });

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ]);
  });

  it('should be able to edit a question from another user', async () => {
    const questionId = 'question-1';
    const authorId = 'author-1';
    const title = faker.lorem.sentence();
    const content = faker.lorem.text();

    inMemoryQuestionsRepository.items = [
      makeQuestion(
        { authorId: new UniqueEntityID('author-2') },
        new UniqueEntityID(questionId),
      ),
    ];

    const result = await sut.execute({
      authorId,
      questionId,
      title,
      content,
      attachmentsIds: [],
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
