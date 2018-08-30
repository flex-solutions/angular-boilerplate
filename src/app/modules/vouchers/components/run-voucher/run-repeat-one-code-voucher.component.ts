import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Voucher } from './../../../../shared/models/voucher.model';
import { DateRangeModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';

@Component({
  selector: 'app-run-repeat-one-code-voucher',
  templateUrl: 'run-repeat-one-code-voucher.component.html'
})

export class RunRepeatOneCodeVoucherComponent extends DialogComponent implements OnInit {

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
