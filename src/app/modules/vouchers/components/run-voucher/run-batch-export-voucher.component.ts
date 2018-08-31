import { VoucherService } from './../../services/vouchers.service';
import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Voucher } from './../../../../shared/models/voucher.model';
import { VoucherRunning } from './../../../../shared/models/voucher-campaign.model';
import { DateRangeModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';

@Component({
  selector: 'app-run-batch-export-voucher',
  templateUrl: 'run-batch-export-voucher.component.html'
})

export class RunBatchExportVoucherComponent extends DialogComponent implements OnInit {
  dateRange: DateRangeModel = new DateRangeModel();
  voucher: Voucher;
  voucherRunning: VoucherRunning = new VoucherRunning();

  constructor(protected dialogService: DialogService,
    private readonly voucherService: VoucherService) {
    super(dialogService);
  }

  ngOnInit() {
    this.voucher = this.callerData;
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    this.voucherService.runVoucher(this.voucherRunning).subscribe(res => {
      this.result = true;
      this.dialogResult();
    });
  }
}
