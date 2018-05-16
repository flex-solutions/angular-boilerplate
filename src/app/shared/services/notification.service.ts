import { Inject, Injectable, Component } from '@angular/core';
import * as toastNotifier from 'toastr';

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
}
