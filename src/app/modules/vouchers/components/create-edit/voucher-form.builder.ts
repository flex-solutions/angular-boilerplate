import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { validationRegex } from '../../../../shared/validation/validators';
import { Voucher } from '../../../../shared/models/voucher.model';

export class VoucherCreationFormBuilder {

    formBuilder: FormBuilder;
    formGroup: FormGroup;

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

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    with(): VoucherCreationFormBuilder {
        this.formGroup = this.formBuilder.group({});
        this.formGroup.addControl(Voucher.validationFields.name, new FormControl('',
        [Validators.required, Validators.pattern(validationRegex.notAllowSpecialCharacters)]));
        return this;
    }

    withDiscountType(isDiscountAmount: boolean): VoucherCreationFormBuilder {
        if (!isDiscountAmount) {
            this.formGroup.addControl(Voucher.validationFields.discount, new FormControl('',
            [Validators.required, Validators.min(0), Validators.pattern(validationRegex.onlyNumber), Validators.max(100)]));
        } else {
            this.formGroup.addControl(Voucher.validationFields.discount, new FormControl('',
            [Validators.required, Validators.pattern(validationRegex.onlyNumber), Validators.min(0)]));
        }

        return this;
    }

    withMustHaveCode(): VoucherCreationFormBuilder {
        this.formGroup.addControl(Voucher.validationFields.code, new FormControl('', [Validators.required,
            Validators.pattern(validationRegex.notAllowSpecialCharacters)]));
        return this;
    }

    withXGetYType() {
        return this;
    }

    build() {
        return this.formGroup;
    }
}
