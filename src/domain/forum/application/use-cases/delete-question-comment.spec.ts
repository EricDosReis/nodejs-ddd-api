import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should delete a question comment', async () => {
    const questionCommentId = 'question-comment-1';
    const authorId = 'author-1';

    inMemoryQuestionCommentsRepository.items = [
      makeQuestionComment(
        { authorId: new UniqueEntityID(authorId) },
        new UniqueEntityID(questionCommentId),
      ),
    ];

    await sut.execute({ authorId, questionCommentId });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question comment from another user', async () => {
    const questionCommentId = 'question-comment-1';
    const authorId = 'author-1';

    inMemoryQuestionCommentsRepository.items = [
      makeQuestionComment(
        { authorId: new UniqueEntityID('author-2') },
        new UniqueEntityID(questionCommentId),
      ),
    ];

    const result = await sut.execute({ authorId, questionCommentId });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
