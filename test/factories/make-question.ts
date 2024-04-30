import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionProps } from '@/domain/forum/enterprise/entities/question';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(override?: Partial<QuestionProps>) {
  const question = Question.create({
    title: 'Question title',
    slug: Slug.createFromText('Question title'),
    authorId: new UniqueEntityID(),
    content: 'Question content',
    ...override,
  });

  return question;
}
