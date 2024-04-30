import type { QuestionsRepository } from '../repositories/questions';

interface EditQuestionUseCaseArguments {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseArguments): Promise<void> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error(
        'Permission denied, you are not the owner of the question.',
      );
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);
  }
}
