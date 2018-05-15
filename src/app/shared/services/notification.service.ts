import { Inject, Injectable, Component } from '@angular/core';
import * as toastNotifier from 'toastr';

@Injectable()
export class NotificationService {
  constructor() {
    toastr.options = {
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
      extendedTimeOut: 1000,
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
  }

  showSuccess(message: string) {
    toastNotifier.success(message, 'Thành Công');
  }

  showError(message: string) {
    toastNotifier.error(message, 'Lỗi');
  }

  showInfo(message: string) {
    toastNotifier.info(message, 'Thông Báo');
  }

  showWarning(message: string) {
    toastNotifier.warning(message, 'Chú Ý');
  }
}
