import { Entity } from "../../core/entities/entity";
import type { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {
  constructor(props: QuestionProps, id?: string) {
    super(props, id);
  }
}
