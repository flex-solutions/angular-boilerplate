import { VoucherRouteNames } from './../../vouchers.constants';
import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { isEmpty, find, get } from 'lodash';
import {
  RepeatOneCodeDto,
  BatchExportCodeDto,
  VoucherOperationType,
  CareCampaignCodeDto,
  VoucherOperationDtoBase
} from './../../../../shared/models/voucher.model';
import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { PromotionsService } from '../../services/promotions.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running',
  templateUrl: './index.component.html',
})

export class VouchersRunningComponent extends AbstractBaseComponent implements OnInit {

  repeatCodeItems: RepeatOneCodeDto[] = [];
  batchExportItems: BatchExportCodeDto[] = [];
  memberCareItems: CareCampaignCodeDto[] = [];

  deleteSuccessMsg: string;

  constructor(private promotionsService: PromotionsService,
    private notificationService: NotificationService,
    private exDialog: ExDialog,
    private translator: TranslateService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.deleteSuccessMsg = this.translator.translate('voucher-running-delete-success');
    this.getVouchersRunning();
  }

  private getVouchersRunning() {
    this.promotionsService.getVouchersRunning().subscribe(result => {
      if (!isEmpty(result)) {
        this.repeatCodeItems = get(find(result, {operationType: VoucherOperationType.RepeatOneCode}), 'voucherRunnings');
        this.batchExportItems = get(find(result, {operationType: VoucherOperationType.BatchExport}), 'voucherRunnings');
        this.memberCareItems = get(find(result, {operationType: VoucherOperationType.MemberCare}), 'voucherRunnings');
      }
    });
  }

  delete(item: VoucherOperationDtoBase) {
    const confirmMsg = this.translator.translate('voucher-running-delete-confirm', item.voucher.name, item.remainCount);

    this.exDialog.openConfirm(confirmMsg).subscribe(result => {
      if (result) {
        this.promotionsService.deleteVoucherRunning(item.id).subscribe(res => {
          this.notificationService.showSuccess(this.deleteSuccessMsg);
          this.getVouchersRunning();
        });
      }
    });
  }

  viewVoucher(item: VoucherOperationDtoBase) {
    const voucherCode = item.voucher.code;
    this.router.navigate([VoucherRouteNames.PROMOTIONS, voucherCode, true]);
  }

  exportCode(item: VoucherOperationDtoBase) {
    const fileName = `${item.voucher.name}.xlsx`;
    this.promotionsService.exportBatchVoucher(item.voucher.code, fileName);
  }
}
