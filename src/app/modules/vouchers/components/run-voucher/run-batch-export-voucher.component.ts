import { VoucherService } from './../../services/vouchers.service';
import { DialogService } from './../../../../shared/ui-common/modal/services/dialog.service';
import { Voucher, BatchExportCodeDto, VoucherOperationType } from './../../../../shared/models/voucher.model';
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
  dto: BatchExportCodeDto = new BatchExportCodeDto();

  constructor(protected dialogService: DialogService,
    private readonly voucherService: VoucherService) {
    super(dialogService);
  }

  ngOnInit() {
    this.voucher = this.callerData;
    const initDate = new DateRangeModel();
    initDate.startDate = new Date();
    initDate.endDate = new Date();
    this.dateRange = initDate;
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {

    this.dto.start_date = this.dateRange.startDate;
    this.dto.end_date = this.dateRange.endDate;
    this.dto.voucher = this.voucher;

    this.voucherService.runVoucher(this.dto, VoucherOperationType.BatchExport).subscribe(res => {
      this.result = true;
      this.dialogResult();
    });
  }
}
