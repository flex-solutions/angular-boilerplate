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
  }

  showError(message: string) {
    toastNotifier.error(message, '', this.options);
  }

  showInfo(message: string) {
    toastNotifier.info(message, '', this.options);
  }

  showWarning(message: string) {
    toastNotifier.warning(message, '', this.options);
  }

  showSuccessPersist(message: string) {
    this.showSuccess(message);
    this.sendMessage(message, MessageType.Success);
  }

  showInfoPersist(message: string) {
    this.showInfo(message);
    this.sendMessage(message, MessageType.Info);
  }

  showWarningPersist(message: string) {
    this.showWarning(message);
    this.sendMessage(message, MessageType.Warning);
  }

  showErrorPersist(message: string) {
    this.showError(message);
    this.sendMessage(message, MessageType.Error);
  }

  private sendMessage(message: string, type: MessageType) {
    const messageItem = new MessageItem(message, type, new Date());
    this.messageService.sendMessage(messageItem);
  }
}
