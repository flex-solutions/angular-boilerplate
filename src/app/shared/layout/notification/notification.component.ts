import { Component, OnDestroy } from '@angular/core';
import { MessageItem } from '../../models/message-item.model';
import { MessageType } from '../../enums/message-type.enum';
import { MessageService } from '../../services/message.service';
import { MessageItemFormat } from '../../models/message-item-format.model';
import { Subscription } from 'rxjs';
import { indexOf, init, append } from 'ramda';

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
      this.messages = init(this.messages);
    }

    const newMessage = new MessageItemFormat(
      message.message,
      message.type,
      message.time
    );

    newMessage.parseTime();
    this.messages = append(newMessage, this.messages);
  }

  isLast(message: MessageItemFormat) {
    return indexOf(message, this.messages) === this.messages.length - 1;
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
