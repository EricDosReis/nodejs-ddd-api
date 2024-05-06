import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { DeleteQuestionUseCase } from './delete-question';
import { NotAllowedError } from './errors/not-allowed';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
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

    await sut.execute({ authorId, questionId });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
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
