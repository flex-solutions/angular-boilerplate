import { DatagridComponent } from './../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { Voucher } from '../../../../shared/models/voucher.model';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { PromotionsService } from '../../services/promotions.service';
import { VoucherTracking } from '../../../../shared/models/voucher-campaign.model';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { ManualUseVoucherCodeComponent } from './manual-use-code.component';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';

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

  deleteSuccessMsg: string;
  useCodeSuccessMsg: string;

  @ViewChild('dg') publishedCodeGrid: DatagridComponent;

  constructor(protected dialogService: DialogService,
    private readonly exDialog: ExDialog,
    private promotionServices: PromotionsService,
    private readonly translateService: TranslateService,
    private readonly notification: NotificationService) {
    super(dialogService);
  }

  ngOnInit(): void {
    this.voucher = this.callerData.voucher;
    this.runningId = this.callerData.runningId;
    this.deleteSuccessMsg = this.translateService.translate('voucher-running-delete-publish-code-success');
    this.useCodeSuccessMsg = this.translateService.translate('voucher-running-use-publish-code-success');
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

  submit() {
    this.result = true;
    this.dialogResult();
  }

  delete(tracking: VoucherTracking) {
    const msg = this.translateService.translate('voucher-running-confirm-delete-tracking', tracking.publish_code, this.voucher.name);
    this.exDialog.openConfirm(msg).subscribe(ok => {
      if (ok) {
        this.promotionServices.deleteRunningTracking(this.runningId, tracking._id).subscribe(() => {
          this.notification.showSuccess(this.deleteSuccessMsg);
          this.loadRemainingCode();
        });
      }
    });
  }

  manualUseVoucherCode(tracking: VoucherTracking) {
    const dialogData = { callerData: {
      voucherName: this.voucher.name,
      publishCode: tracking.publish_code
    }};

    this.exDialog.openPrime(ManualUseVoucherCodeComponent, dialogData).subscribe(result => {
      if (result) {
        const billId = result;
        this.promotionServices.manualUseVoucherCode(tracking.publish_code, tracking.membership_id, billId).subscribe(() => {
          this.notification.showSuccess(this.useCodeSuccessMsg);
          this.publishedCodeGrid.refresh();
        });
      }
    });
  }

  private loadRemainingCode() {
    const searchKey =  this.dgFilter.searchKey;
    const pageSize =  this.dgFilter.pagination.itemsPerPage;
    const pageNumber =  this.dgFilter.pagination.page;

    this.promotionServices.getRemainingCodes(this.runningId, searchKey, pageSize, pageNumber).subscribe(res => {
      this.voucherTrackings = res;
    });
  }

}
