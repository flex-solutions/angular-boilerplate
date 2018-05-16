import { Inject, Injectable, Component } from '@angular/core';
import * as toastNotifier from 'toastr';
import { MessageService } from './message.service';
import { MessageItem } from '../models/message-item.model';
import { MessageType } from '../enums/message-type.enum';

@Injectable()
export class NotificationService {
  options = {
    debug: false,
    tapToDismiss: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    progressBar: true,
    newestOnTop: true,
    closeButton: true,
    onclick: null,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 5000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  };

  constructor(private messageService: MessageService) {}

  showSuccess(message: string) {
    toastNotifier.success(message, '', this.options);

    const messageItem = new MessageItem(
      message,
      MessageType.Success,
      new Date()
    );
    this.messageService.sendMessage(messageItem);
  }

  showError(message: string) {
    toastNotifier.error(message, '', this.options);

    const messageItem = new MessageItem(message, MessageType.Error, new Date());
    this.messageService.sendMessage(messageItem);
  }

  showInfo(message: string) {
    toastNotifier.info(message, '', this.options);

    const messageItem = new MessageItem(message, MessageType.Info, new Date());
    this.messageService.sendMessage(messageItem);
  }

  showWarning(message: string) {
    toastNotifier.warning(message, '', this.options);

    const messageItem = new MessageItem(
      message,
      MessageType.Warning,
      new Date()
    );
    this.messageService.sendMessage(messageItem);
  }
}
