import * as moment from 'moment';
import { MessageItem } from './message-item.model';

export class MessageItemFormat extends MessageItem {
  displayTime: string;

  parseTime() {
    this.displayTime = moment(this.time).fromNow();
  }
}
