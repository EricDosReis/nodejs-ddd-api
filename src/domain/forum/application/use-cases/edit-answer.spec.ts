import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { EditAnswerUseCase } from './edit-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should edit a answer', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-1';
    const content = faker.lorem.text();

    inMemoryAnswersRepository.items = [
      makeAnswer(
        { authorId: new UniqueEntityID(authorId) },
        new UniqueEntityID(answerId),
      ),
    ];

    await sut.execute({ authorId, answerId, content });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content,
    });
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

    expect(() => {
      return sut.execute({ authorId, answerId, content });
    }).rejects.toBeInstanceOf(Error);
  });
});
