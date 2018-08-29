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
        message: 'Vui lòng nhập tên chương trình'
      },
      {
          type: 'pattern',
          message: 'Tên chương trình không cho phép ký tự đặc biệt'
      }
    ],
    code: [
      {
        type: 'required',
        message: 'Vui lòng nhập mã voucher'
      },
      {
          type: 'pattern',
          message: 'Mã voucher không cho phép ký tự đặc biệt'
      }
    ],
    discount: [
        {
            type: 'required',
            message: 'Vui lòng nhập chỉ số giảm giá'
        },
        {
            type: 'min',
            message: 'Giảm giá thấp nhất là 0đ hoặc 0%'
        },
        {
            type: 'max',
            message: 'Phần trăm giảm giá tối đa là 100%'
        }
        ,
        {
            type: 'pattern',
            message: 'Chỉ số giảm giá phải là số'
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
