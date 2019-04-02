import { PromotionsService } from './../../services/promotions.service';
import { Location } from '@angular/common';
import { CommonCreateEditVoucherComponent } from './common.component.';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import {
  Voucher,
  VoucherGroupType,
  VoucherType} from './../../../../shared/models/voucher.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-voucher-edit-voucher-running',
  templateUrl: './edit-voucher-running.component.html',
})
export class EditVoucherRunningComponent implements OnInit {
  voucher: Voucher = new Voucher();
  voucherRunningId: string;
  voucherCode: string;
  voucherGroupType: VoucherGroupType = VoucherGroupType.Discount;

  @ViewChild('commonCreateEditVoucher') commonCreateEditVoucher: CommonCreateEditVoucherComponent;

  constructor(
    private readonly promotionsService: PromotionsService,
    public readonly translateService: TranslateService,
    private readonly notification: NotificationService,
    private readonly location: Location,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params: Params) => {
      this.voucherRunningId = params['id'] ? params['id'] : '';
      this.voucherCode = params['code'] ? params['code'] : '';
    });
  }

  ngOnInit() {
    setTimeout(() => {
        this.getVoucherForEdit();
    });
  }

  submit() {
    this.commonCreateEditVoucher.submit(this.voucher);
    this.promotionsService.updateVoucher(this.voucherRunningId, this.voucher).subscribe(() => {
      const msg = this.translateService.translate('voucher-running-update-success', this.voucher.name);
      this.notification.showSuccess(msg);
    });
  }

  cancel() {
    this.location.back();
  }

  private async getVoucherForEdit() {
    await this.commonCreateEditVoucher.init();
    this.promotionsService.getVoucher(this.voucherCode).subscribe(res => {
      this.voucher = res;
      this.commonCreateEditVoucher.assignData(this.voucher);

      if (this.voucher.type !== VoucherType.XGetY) {
        this.voucherGroupType = VoucherGroupType.Discount;
      } else {
        this.voucherGroupType = VoucherGroupType.XGetY;
      }
    });
  }
}
