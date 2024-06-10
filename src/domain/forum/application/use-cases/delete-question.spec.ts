import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { makeQuestion } from 'test/factories/make-question';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { DeleteQuestionUseCase } from './delete-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );

    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should delete a question', async () => {
    const questionId = 'question-1';
    const authorId = 'author-1';

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

    await sut.execute({ authorId, questionId });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question from another user', async () => {
    const questionId = 'question-1';
    const authorId = 'author-1';

    inMemoryQuestionsRepository.items = [
      makeQuestion(
        { authorId: new UniqueEntityID('author-2') },
        new UniqueEntityID(questionId),
      ),
    ];

    const result = await sut.execute({ authorId, questionId });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
