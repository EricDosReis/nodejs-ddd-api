import { Entity } from "../../core/entities/entity";
import type { Optional } from "../../core/entities/types/optional";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import type { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return question;
  }
}
