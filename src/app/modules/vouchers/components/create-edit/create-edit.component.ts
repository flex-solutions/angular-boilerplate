import { CommonCreateEditVoucherComponent } from './common.component.';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { VoucherService } from './../../services/vouchers.service';
import {
  Voucher,
  VoucherGroupType,
  VoucherType,
  VoucherOperationType
} from './../../../../shared/models/voucher.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { eq } from 'lodash';
import { VoucherFormFactory } from './voucher-form.factory';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';

@Component({
  selector: 'app-voucher-create-edit',
  templateUrl: './create-edit.component.html'
  // styleUrls: ['./create-edit.component.css']
})
export class CreateEditVoucherComponent extends AbstractFormComponent
  implements OnInit {
  voucher: Voucher = new Voucher();
  voucherId: string;
  isDiscountAmount = true;
  voucherGroupType: VoucherGroupType = VoucherGroupType.Discount;
  voucherOperationType: VoucherOperationType =
    VoucherOperationType.RepeatOneCode;
  isShowVoucherCodeInput = true;

  createVoucherSuccessMsg: string;

  @ViewChild('commonCreateEditVoucher') commonCreateEditVoucher: CommonCreateEditVoucherComponent;

  constructor(
    private readonly voucherService: VoucherService,
    public readonly translateService: TranslateService,
    private readonly router: Router,
    private readonly notification: NotificationService,
    public readonly voucherFormFactory: VoucherFormFactory,
    activatedRoute: ActivatedRoute
  ) {
    super();
    activatedRoute.params.subscribe((params: Params) => {
      this.voucherId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.createVoucherSuccessMsg = this.translateService.translate(
      'voucher-create-success'
    );

    setTimeout(() => {
      if (!this.isEdit) {
        this.commonCreateEditVoucher.init();
      } else {
        this.getVoucherForEdit();
      }
    });
  }

  protected onSubmit() {
    this.voucher.type = this.voucherType;
    this.voucher.operationType = this.voucherOperationType;
    this.commonCreateEditVoucher.submit(this.voucher);

    if (!this.isEdit) {
      this.voucherService.create(this.voucher).subscribe(() => {
        this.notification.showSuccess(this.createVoucherSuccessMsg);
        this.finish();
      });
    } else {
      this.voucherService.update(this.voucher).subscribe(() => {
        const msg = this.translateService.translate('voucher-edit-success', this.voucher.name);
        this.notification.showSuccess(msg);
      });
    }
  }

  protected resetForm() {
    super.resetForm();
    this.voucher = new Voucher();
  }

  protected onCancel() {
    this.router.navigate(['voucher']);
  }

  protected onCreateForm() {
    super.onCreateForm();
    this.rebuildFormGroup();
  }

  private async getVoucherForEdit() {
    await this.commonCreateEditVoucher.init();
    this.voucherService.getById(this.voucherId).subscribe(res => {
      this.voucher = res;
      this.commonCreateEditVoucher.assignData(this.voucher);

      if (this.voucher.type !== VoucherType.XGetY) {
        this.isDiscountAmount =
          this.voucher.type === VoucherType.DiscountAmount;
        this.voucherGroupType = VoucherGroupType.Discount;
      } else {
        this.voucherGroupType = VoucherGroupType.XGetY;
      }
      this.voucherOperationType = this.voucher.operationType;
      this.rebuildFormGroup();
    });
  }

  private rebuildFormGroup() {
    this.buildFormGroupBaseOnVoucherType();
    this.buildFormGroupBaseOnVoucherOperationType();
    this.formGroup = this.voucherFormFactory.formGroup;
  }

  get code() {
    return this.formGroup.get(Voucher.validationFields.code);
  }

  get name() {
    return this.formGroup.get(Voucher.validationFields.name);
  }

  get discount() {
    return this.formGroup.get(Voucher.validationFields.discount);
  }

  get description() {
    return this.formGroup.get(Voucher.validationFields.description);
  }

  get voucherType() {
    if (+this.voucherGroupType === VoucherGroupType.Discount) {
      if (this.isDiscountAmount) {
        return VoucherType.DiscountAmount;
      }
      return VoucherType.DiscountPercent;
    }
    return VoucherType.XGetY;
  }

  buildFormGroupBaseOnVoucherType() {
    this.commonCreateEditVoucher.removeSelectedGiftSet();
    this.formGroup = this.voucherFormFactory.produceBaseOnVoucherType(
      this.voucherType
    );
  }

  buildFormGroupBaseOnVoucherOperationType() {
    this.isShowVoucherCodeInput = !eq(
      +this.voucherOperationType,
      +VoucherOperationType.BatchExport
    );
    this.formGroup = this.voucherFormFactory.produceBaseOnVoucherOperationType(
      this.voucherOperationType
    );
  }
}
