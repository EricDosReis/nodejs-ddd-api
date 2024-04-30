import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionProps } from '@/domain/forum/enterprise/entities/question';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(
  override?: Partial<QuestionProps>,
  id?: UniqueEntityID,
) {
  const title = faker.lorem.sentence();

  const question = Question.create(
    {
      title,
      slug: Slug.createFromText(title),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}
