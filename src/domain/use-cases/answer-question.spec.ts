import { expect, it } from "vitest";

import type { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answers";
import { AnswerQuestionUseCase } from "./answer-question";

const answersRepositoryMock: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

it("should create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(answersRepositoryMock);

  const answer = await answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "New reply",
  });

  expect(answer.content).toEqual("New reply");
});
