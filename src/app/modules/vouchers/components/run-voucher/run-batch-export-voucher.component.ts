import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Voucher } from './../../../../shared/models/voucher.model';
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

  constructor(protected dialogService: DialogService) {
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
    this.result = true;
    this.dialogResult();
  }
}
