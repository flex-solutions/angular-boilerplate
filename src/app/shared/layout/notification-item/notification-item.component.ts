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
  @Input() isLast: boolean;
  divClass: string;
  iClass: string;
  constructor() {}

  ngOnInit() {
    if (this.message) {
      let partialDivClass = '';
      let partialIClass = '';
      switch (this.message.type) {
        case MessageType.Success:
          partialDivClass = 'bg-inverse-success';
          partialIClass = 'mdi-check';
          break;
        case MessageType.Info:
          partialDivClass = 'bg-inverse-info';
          partialIClass = 'mdi-information-variant';
          break;
        case MessageType.Warning:
          partialDivClass = 'bg-inverse-warning';
          partialIClass = 'mdi-alert-outline';
          break;
        case MessageType.Error:
          partialDivClass = 'bg-inverse-danger';
          partialIClass = 'mdi-alert-circle-outline';
          break;
        default:
          break;
      }

      this.divClass = `preview-icon ${partialDivClass}`;
      this.iClass = `mdi ${partialIClass} mx-0`;
    }
  }
}
