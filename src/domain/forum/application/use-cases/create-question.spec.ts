import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions';
import { CreateQuestionUseCase } from './create-question';

const questionsRepositoryMock: QuestionsRepository = {
  create: async (question: Question) => {
    return;
  },
};

it('should create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(questionsRepositoryMock);

  const { question } = await createQuestion.execute({
    title: 'This is my question',
    authorId: new UniqueEntityID(),
    content: 'Question content',
  });

  expect(question.content).toEqual('Question content');
});
