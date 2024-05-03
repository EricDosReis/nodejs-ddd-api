import type { QuestionsRepository } from '../repositories/questions';

interface DeleteQuestionUseCaseArguments {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseArguments): Promise<void> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error(
        'Permission denied, you are not the author of the question.',
      );
    }

    await this.questionsRepository.delete(question);
  }
}
