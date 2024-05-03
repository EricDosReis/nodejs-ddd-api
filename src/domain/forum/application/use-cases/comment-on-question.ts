import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import type { QuestionCommentsRepository } from '../repositories/question-comments';
import type { QuestionsRepository } from '../repositories/questions';

interface CommentOnQuestionUseCaseArguments {
  content: string;
  authorId: string;
  questionId: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    content,
    authorId,
    questionId,
  }: CommentOnQuestionUseCaseArguments): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    const questionComment = QuestionComment.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
