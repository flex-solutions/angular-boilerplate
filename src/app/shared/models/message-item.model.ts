import { MessageType } from '../enums/message-type.enum';

export class MessageItem {
  constructor(message: string, type: MessageType, time: Date) {
    this.message = message;
    this.type = type;
    this.time = time;
  }

  message: string;
  type: MessageType;
  time: Date;
}
