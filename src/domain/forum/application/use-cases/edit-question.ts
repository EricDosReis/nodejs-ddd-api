import type { Either } from '@/core/error-handling/either';
import { failure } from '@/core/error-handling/failure';
import { success } from '@/core/error-handling/success';
import type { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';
import { NotAllowedError } from './errors/not-allowed';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface EditQuestionUseCaseArguments {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseArguments): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return success({
      question,
    });
  }
}
