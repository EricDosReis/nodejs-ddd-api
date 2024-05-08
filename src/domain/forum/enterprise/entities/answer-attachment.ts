import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AnswerAttachmentProps {
  attachmentId: UniqueEntityID;
  answerId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get attachmentId() {
    return this.props.attachmentId;
  }

  get answerId() {
    return this.props.answerId;
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }
}
