import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
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

    await sut.execute({ authorId, questionId, title, content });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title,
      content,
    });
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

    const result = await sut.execute({ authorId, questionId, title, content });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
