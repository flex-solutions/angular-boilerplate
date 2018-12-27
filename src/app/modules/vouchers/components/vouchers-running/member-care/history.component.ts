import { IFilterChangedEvent } from './../../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { of } from 'rxjs';
import { VoucherTracking } from '../../../../../shared/models/voucher-campaign.model';
import { Voucher } from '../../../../../shared/models/voucher.model';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running-member-care-history',
  templateUrl: './history.component.html',
})

export class HistoryOfMemberCareComponent extends DialogComponent implements OnInit {
  voucher: Voucher = new Voucher();
  runningId: string;
  pagingArgs: IFilterChangedEvent;
  voucherHistories: VoucherTracking[] = [];

  ngOnInit(): void {
    this.voucher = this.callerData.voucher;
    this.runningId = this.callerData.runningId;
  }

  close() {
    this.dialogResult();
  }

  public count = (searchKey) => of(100);

  onPageChanged(args: IFilterChangedEvent) {
    this.pagingArgs = args;
  }
}
