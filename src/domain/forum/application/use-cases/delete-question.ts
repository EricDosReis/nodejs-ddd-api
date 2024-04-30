import type { QuestionsRepository } from '../repositories/questions';

interface DeleteQuestionUseCaseArguments {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseArguments): Promise<void> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Permission denied, you are not the question's owner.");
    }

    await this.questionRepository.delete(question);
  }
}
