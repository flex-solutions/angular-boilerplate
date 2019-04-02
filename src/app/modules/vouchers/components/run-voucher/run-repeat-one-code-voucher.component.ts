import { VoucherService } from './../../services/vouchers.service';
import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Voucher, RepeatOneCodeDto, VoucherOperationType } from './../../../../shared/models/voucher.model';
import { DateRangeModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';

@Component({
  selector: 'app-run-repeat-one-code-voucher',
  templateUrl: 'run-repeat-one-code-voucher.component.html'
})

export class RunRepeatOneCodeVoucherComponent extends DialogComponent implements OnInit {

  dateRange: DateRangeModel = new DateRangeModel();
  usageLimit: number;
  voucher: Voucher;

  constructor(protected dialogService: DialogService,
    private readonly voucherService: VoucherService) {
    super(dialogService);
  }

  ngOnInit() {
    this.dateRange = this.voucherService.initAffectTime();
    this.voucher = this.callerData;
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {

    const dto = new RepeatOneCodeDto();
    dto.voucher = this.voucher;
    dto.usageLimit = this.usageLimit;
    dto.start_date = this.dateRange.startDate;
    dto.end_date = this.dateRange.endDate;

    this.voucherService.runVoucher(dto, VoucherOperationType.RepeatOneCode).subscribe(res => {
      this.result = true;
      this.dialogResult();
    });
  }
}
