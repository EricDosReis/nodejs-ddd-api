import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers';
import { AnswerQuestionUseCase } from './answer-question';

const answersRepositoryMock: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

it('should create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(answersRepositoryMock);

  const { answer } = await answerQuestion.execute({
    questionId: new UniqueEntityID(),
    instructorId: new UniqueEntityID(),
    content: 'New reply',
  });

  expect(answer.content).toEqual('New reply');
});
