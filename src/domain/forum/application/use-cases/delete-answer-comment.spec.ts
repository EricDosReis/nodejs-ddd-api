import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should delete an answer comment', async () => {
    const answerCommentId = 'answer-comment-1';
    const authorId = 'author-1';

    inMemoryAnswerCommentsRepository.items = [
      makeAnswerComment(
        { authorId: new UniqueEntityID(authorId) },
        new UniqueEntityID(answerCommentId),
      ),
    ];

    await sut.execute({ authorId, answerCommentId });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete an answer comment from another user', async () => {
    const answerCommentId = 'answer-comment-1';
    const authorId = 'author-1';

    inMemoryAnswerCommentsRepository.items = [
      makeAnswerComment(
        { authorId: new UniqueEntityID('author-2') },
        new UniqueEntityID(answerCommentId),
      ),
    ];

    const result = await sut.execute({ authorId, answerCommentId });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
