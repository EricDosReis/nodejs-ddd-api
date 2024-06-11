import { WatchedList } from '@/core/entities/watched-list';
import { QuestionAttachment } from './question-attachment';

export class QuestionAttachmentWatchedList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment) {
    return a.attachmentId.equals(b.attachmentId);
  }
}
