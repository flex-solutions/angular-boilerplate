import { Component, OnInit, Input } from '@angular/core';
import { MessageItem } from '../../models/message-item.model';
import { MessageType } from '../../enums/message-type.enum';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {
  @Input() message: MessageItem;
  itemClass: string;
  constructor() {}

  ngOnInit() {
    if (this.message) {
      let typeClass = '';
      switch (this.message.type) {
        case MessageType.Success:
          typeClass = 'bg-inverse-success';
          break;
        case MessageType.Info:
          typeClass = 'bg-inverse-info';
          break;
        case MessageType.Warning:
          typeClass = 'bg-inverse-warning';
          break;
        case MessageType.Error:
          typeClass = 'bg-inverse-danger';
          break;
        default:
          break;
      }

      this.itemClass = `preview-icon ${typeClass}`;
    }
  }
}
