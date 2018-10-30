import { NotificationService } from './../../../../shared/services/notification.service';
import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { Voucher, VoucherOperationType } from './../../../../shared/models/voucher.model';
import { Injectable } from '@angular/core';
import { RunBatchExportVoucherComponent } from './run-batch-export-voucher.component';
import { RunRepeatOneCodeVoucherComponent } from './run-repeat-one-code-voucher.component';
import { TranslateService } from '../../../../shared/services/translate.service';

@Injectable()
export class VoucherRunner {

  constructor(private readonly exDialog: ExDialog,
    private readonly translateService: TranslateService,
    private readonly notification: NotificationService) {
    }

  run(voucher: Voucher) {
    const dialogData = { callerData: voucher };
    switch (voucher.operationType) {
      case VoucherOperationType.BatchExport:
        this.exDialog.openPrime(RunBatchExportVoucherComponent, dialogData).subscribe(result => this.onRunnerClosed(result, voucher));
        break;
      case VoucherOperationType.RepeatOneCode:
        this.exDialog.openPrime(RunRepeatOneCodeVoucherComponent, dialogData).subscribe(result => this.onRunnerClosed(result, voucher));
        break;
      case VoucherOperationType.MemberCare:
        const msg = this.translateService.translate('voucher-running-customer-care', voucher.name);
        this.exDialog.openMessage(msg);
        break;
    }
  }

  onRunnerClosed(eventArgs: any, voucher: Voucher): any {
    if (eventArgs && eventArgs === true) {

      const successMsg = this.translateService.translate('voucher-running-success', voucher.name);
      this.notification.showSuccess(successMsg);
    }
  }
}
