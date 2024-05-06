import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Either } from '@/core/error-handling/either';
import { success } from '@/core/error-handling/success';
import { Question } from '../../enterprise/entities/question';
import type { QuestionsRepository } from '../repositories/questions';

interface CreateQuestionUseCaseArguments {
  title: string;
  content: string;
  authorId: UniqueEntityID;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    content,
    authorId,
  }: CreateQuestionUseCaseArguments): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId,
    });

    await this.questionsRepository.create(question);

    return success({ question });
  }
}
