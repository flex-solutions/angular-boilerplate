import { MessageType } from '../enums/message-type.enum';

export class MessageItem {
  message: string;
  type: MessageType;
  time: Date;
}
