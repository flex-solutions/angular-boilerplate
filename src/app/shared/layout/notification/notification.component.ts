import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MessageItem } from '../../models/message-item.model';
import { MessageType } from '../../enums/message-type.enum';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy {
  message: any;
  subscription: Subscription;
  messages: MessageItem[] = [];

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService
      .getMessage()
      .subscribe(message => this.onReceiveMessage(message));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onReceiveMessage(message: any) {
    console.log(message);
    if (this.messages.length === 5) {
      this.messages.pop();
    }

    this.messages.unshift(message);
  }

  isLast(message: MessageItem) {
    return this.messages.indexOf(message) === this.messages.length - 1;
  }
}
