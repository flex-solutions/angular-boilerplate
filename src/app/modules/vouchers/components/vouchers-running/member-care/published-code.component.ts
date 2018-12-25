import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { Voucher } from '../../../../../shared/models/voucher.model';
import { IFilterChangedEvent } from '../../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../../../../shared/ui-common/modal/services/dialog.service';
import { PromotionsService } from '../../../services/promotions.service';
import { VoucherTracking } from '../../../../../shared/models/voucher-campaign.model';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running-member-care-published-code',
  templateUrl: './published-code.component.html',
})

export class PublishedVoucherCodeOfMemberCareComponent extends DialogComponent implements OnInit {

  voucher: Voucher;
  runningId: string;
  dgFilter: IFilterChangedEvent;

  voucherTrackings: VoucherTracking[] = [];

  constructor(protected dialogService: DialogService,
    private promotionServices: PromotionsService) {
    super(dialogService);
  }

  ngOnInit(): void {
    this.voucher = this.callerData.voucher;
    this.runningId = this.callerData.runningId;
  }

  public count = (searchKey: string): Observable<number> => {
    return this.promotionServices.countRemainingCodes(this.runningId, searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.dgFilter = eventArg;
    this.loadRemainingCode();
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {}

  private loadRemainingCode() {
    const searchKey =  this.dgFilter.searchKey;
    const pageSize =  this.dgFilter.pagination.itemsPerPage;
    const pageNumber =  this.dgFilter.pagination.page;

    this.promotionServices.getRemainingCodes(this.runningId, searchKey, pageSize, pageNumber).subscribe(res => {
      this.voucherTrackings = res;
    });
  }
}
