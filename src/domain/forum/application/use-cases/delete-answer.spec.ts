import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
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

    await sut.execute({ authorId, answerId });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
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

    expect(() => {
      return sut.execute({ authorId, answerId });
    }).rejects.toBeInstanceOf(Error);
  });
});
