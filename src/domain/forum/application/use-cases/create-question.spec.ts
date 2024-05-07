import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );

    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should create a question', async () => {
    const { value } = await sut.execute({
      title: 'This is my question',
      content: 'Question content',
      attachmentsIds: ['1', '2'],
      authorId: new UniqueEntityID(),
    });

    expect(value?.question.content).toEqual('Question content');
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(value?.question.id);
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
  });
});
