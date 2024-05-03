import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it('should create a comment on question', async () => {
    const content = 'Comment content';
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    const { questionComment } = await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content,
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      content,
    );
  });
});
