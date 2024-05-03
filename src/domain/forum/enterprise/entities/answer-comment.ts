import { Entity } from '@/core/entities/entity';
import type { Optional } from '@/core/entities/types/optional';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AnswerCommentProps {
  content: string;
  answerId: UniqueEntityID;
  authorId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;

    this.touch();
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return answerComment;
  }
}
