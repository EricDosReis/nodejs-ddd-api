import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should create a question', async () => {
    const { question } = await sut.execute({
      title: 'This is my question',
      authorId: new UniqueEntityID(),
      content: 'Question content',
    });

    expect(question.content).toEqual('Question content');
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});
