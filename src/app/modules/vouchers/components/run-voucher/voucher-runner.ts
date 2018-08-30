import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { Voucher, VoucherOperationType } from './../../../../shared/models/voucher.model';
import { Injectable } from '@angular/core';
import { RunBatchExportVoucherComponent } from './run-batch-export-voucher.component';

@Injectable()
export class VoucherRunner {

  constructor(private readonly exDialog: ExDialog) {}

  run(voucher: Voucher) {
    switch (voucher.operationType) {
      case VoucherOperationType.BatchExport:
        this.exDialog.openPrime(RunBatchExportVoucherComponent, { callerData: voucher });
        break;
      case VoucherOperationType.RepeatOneCode:
        break;
    }
  }
}
