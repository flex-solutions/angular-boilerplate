import { VoucherOperationType, VoucherType } from './../../../../shared/models/voucher.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Voucher } from '../../../../shared/models/voucher.model';
import { validationRegex } from '../../../../shared/validation/validators';

@Injectable()
export class VoucherFormFactory {
  public formGroup: FormGroup;
  public errors = {
    name: [
      {
        type: 'required',
        message: 'voucher-create-edit-validation-name-required'
      },
      {
          type: 'pattern',
          message: 'voucher-create-edit-validation-name-special-char'
      }
    ],
    code: [
      {
        type: 'required',
        message: 'voucher-create-edit-validation-voucher-code-required'
      },
      {
          type: 'pattern',
          message: 'voucher-create-edit-validation-voucher-code-special-char'
      }
    ],
    discount: [
        {
            type: 'required',
            message: 'voucher-create-edit-validation-discount-required'
        },
        {
            type: 'min',
            message: 'voucher-create-edit-validation-discount-min'
        },
        {
            type: 'max',
            message: 'voucher-create-edit-validation-discount-max'
        }
        ,
        {
            type: 'pattern',
            message: 'voucher-create-edit-validation-discount-pattern'
        }
    ]
  };

  constructor(public formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl(Voucher.validationFields.name, new FormControl('',
    [Validators.required, Validators.pattern(validationRegex.notAllowSpecialCharacters)]));
  }

  produceBaseOnVoucherType(voucherType: VoucherType): FormGroup {
    this.baseOnVoucherType(voucherType);
    return this.formGroup;
  }

  produceBaseOnVoucherOperationType(voucherOperationType: VoucherOperationType): FormGroup {
    this.baseOnVoucherOperationType(voucherOperationType);
    return this.formGroup;
  }

  private baseOnVoucherType(voucherType: VoucherType) {
    this.formGroup.removeControl(Voucher.validationFields.discount);
    switch (+voucherType) {
      case VoucherType.DiscountAmount:
      this.formGroup.addControl(Voucher.validationFields.discount, new FormControl('',
            [Validators.required, Validators.pattern(validationRegex.onlyNumber), Validators.min(0)]));
        break;
      case VoucherType.DiscountPercent:
      this.formGroup.addControl(Voucher.validationFields.discount, new FormControl('',
            [Validators.required, Validators.min(0), Validators.pattern(validationRegex.onlyNumber), Validators.max(100)]));
        break;
      case VoucherType.XGetY:
        // TODO
        break;
    }
  }

  private baseOnVoucherOperationType(operationType: VoucherOperationType) {
    this.formGroup.removeControl(Voucher.validationFields.code);
    switch (+operationType) {
      case VoucherOperationType.BatchExport:
        break;
      case VoucherOperationType.RepeatOneCode:
      case VoucherOperationType.ForMembersOnly:
        this.formGroup.addControl(Voucher.validationFields.code, new FormControl('', [Validators.required,
        Validators.pattern(validationRegex.notAllowSpecialCharacters)]));
        break;
    }
  }
}
