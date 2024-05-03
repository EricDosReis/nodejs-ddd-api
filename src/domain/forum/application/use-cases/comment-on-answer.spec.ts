import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  it('should create a comment on answer', async () => {
    const content = 'Comment content';
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const { answerComment } = await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content,
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(content);
  });
});
