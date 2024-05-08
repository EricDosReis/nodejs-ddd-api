import { WatchedList } from '@/core/entities/watched-list';
import { AnswerAttachment } from './answer-attachment';

export class AnswerAttachmentWatchedList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment) {
    return a.attachmentId === b.attachmentId;
  }
}
