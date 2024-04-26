import { randomUUID } from "node:crypto";

import type { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;

  constructor({ title, slug, content, authorId }: QuestionProps, id?: string) {
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.authorId = authorId;
    this.id = id ?? randomUUID();
  }
}
