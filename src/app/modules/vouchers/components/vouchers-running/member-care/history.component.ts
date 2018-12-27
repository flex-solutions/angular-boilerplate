import { IFilterChangedEvent } from './../../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { of } from 'rxjs';
import { VoucherTracking } from '../../../../../shared/models/voucher-campaign.model';
import { Voucher } from '../../../../../shared/models/voucher.model';
import { DialogService } from '../../../../../shared/ui-common/modal/services/dialog.service';
import { PromotionsService } from '../../../services/promotions.service';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running-member-care-history',
  templateUrl: './history.component.html',
})

export class HistoryOfMemberCareComponent extends DialogComponent implements OnInit {
  voucher: Voucher = new Voucher();
  pagingArgs: IFilterChangedEvent;
  voucherHistories: VoucherTracking[] = [];

  constructor(protected dialogService: DialogService,
    private promotionServices: PromotionsService, ) {
    super(dialogService);
  }

  ngOnInit(): void {
    this.voucher = this.callerData.voucher;
  }

  close() {
    this.dialogResult();
  }

  public count = (searchKey) => {
    return this.promotionServices.countVoucherHistory(searchKey, this.voucher.code);
  }

  onPageChanged(args: IFilterChangedEvent) {
    this.pagingArgs = args;
    this.loadVoucherHistory();
  }

  private loadVoucherHistory() {
    const searchKey = this.pagingArgs.searchKey;
    const pageSize = this.pagingArgs.pagination.itemsPerPage;
    const pageNumber = this.pagingArgs.pagination.page;

    this.promotionServices.getVoucherHistory(this.voucher.code, searchKey, pageSize, pageNumber)
    .subscribe(res => this.voucherHistories = res);
  }
}
