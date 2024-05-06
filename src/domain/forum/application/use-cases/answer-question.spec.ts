import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create an answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should create an answer', async () => {
    const { value } = await sut.execute({
      questionId: new UniqueEntityID(),
      instructorId: new UniqueEntityID(),
      content: 'New reply',
    });

    expect(value?.answer.content).toEqual('New reply');
    expect(inMemoryAnswersRepository.items[0].id).toEqual(value?.answer.id);
  });
});
