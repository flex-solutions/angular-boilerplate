import { isEmpty, find, get } from 'lodash';
import { RepeatOneCodeDto, BatchExportCodeDto, VoucherOperationType, CareCampaignCodeDto } from './../../../../shared/models/voucher.model';
import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { VoucherService } from '../../services/vouchers.service';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running',
  templateUrl: './index.component.html',
})

export class VouchersRunningComponent extends AbstractBaseComponent implements OnInit {

  repeatCodeItems: RepeatOneCodeDto[] = [];
  batchExportItems: BatchExportCodeDto[] = [];
  memberCareItems: CareCampaignCodeDto[] = [];

  constructor(private voucherService: VoucherService) {
    super();
  }

  ngOnInit(): void {
    this.getVouchersRunning();
  }

  private getVouchersRunning() {
    this.voucherService.getVouchersRunning().subscribe(result => {
      if (!isEmpty(result)) {
        this.repeatCodeItems = get(find(result, {operationType: VoucherOperationType.RepeatOneCode}), 'voucherRunnings');
        this.batchExportItems = get(find(result, {operationType: VoucherOperationType.BatchExport}), 'voucherRunnings');
        this.memberCareItems = get(find(result, {operationType: VoucherOperationType.MemberCare}), 'voucherRunnings');
      }
    });
  }
}
