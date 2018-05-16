import { Component, OnInit } from '@angular/core';
import { MessageItem } from '../../models/message-item.model';
import { MessageType } from '../../enums/message-type.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  messages: MessageItem[] = [];
  constructor() {
    for (let y = 0; y < 5; y++) {
      let i = new MessageItem();
      i.message = 'asdsad';
      i.time = new Date('December 17, 1995 03:24:00');
      i.type = MessageType.Error;
      this.messages.push(i);
    }
  }

  ngOnInit() {}
}
