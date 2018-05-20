import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MessageItem } from '../../models/message-item.model';
import { MessageType } from '../../enums/message-type.enum';
import { MessageService } from '../../services/message.service';
import { MessageItemFormat } from '../../models/message-item-format.model';

declare let $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy {
  message: any;
  subscription: Subscription;
  messages: MessageItemFormat[] = [];

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService
      .getMessage()
      .subscribe(message => this.onReceiveMessage(message));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onReceiveMessage(message: MessageItem) {
    if (this.messages.length === 5) {
      this.messages.pop();
    }

    const newMessage = new MessageItemFormat(
      message.message,
      message.type,
      message.time
    );

    newMessage.parseTime();
    this.messages.unshift(newMessage);
  }

  isLast(message: MessageItemFormat) {
    return this.messages.indexOf(message) === this.messages.length - 1;
  }

  onRepoClicked() {
    this.refreshDisplayTime();
  }

  refreshDisplayTime() {
    this.messages.forEach(element => {
      element.parseTime();
    });
  }
}
