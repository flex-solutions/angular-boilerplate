import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from './../../../../shared/services/translate.service';
import { VoucherService } from './../../services/vouchers.service';
import { Voucher } from './../../../../shared/models/voucher.model';
import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Location } from '@angular/common';

@Component({
    selector: 'app-voucher-create-edit',
    templateUrl: './create-edit.component.html',
    // styleUrls: ['./create-edit.component.css']
})

export class CreateEditVoucherComponent extends AbstractFormComponent implements OnInit {

    voucher: Voucher = new Voucher();
    voucherId: string;

    constructor(private readonly voucherService: VoucherService,
        public readonly translateService: TranslateService,
        private readonly location: Location,
        private readonly formbuilder: FormBuilder,
        activatedRoute: ActivatedRoute) {
            super();
        //     activatedRoute.params.subscribe((params: Params) => {
        //         this.voucherId = params['id'] ? params['id'] : '';
        //         this.isEdit = params['id'] ? true : false;
        //           if (this.isEdit) {
        //                 this.cardTitle = this.translateService.translate('membership-type-update-title');
        //                 this.cardDescription = this.translateService.translate('membership-type-update-sub-title');
        //               } else {
        //                     this.cardTitle = this.translateService.translate('membership-type-create-title');

        //     this.cardDescription = this.translateService.translate('membership-type-create-sub-title');
        //   }
        // });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected onSubmit() {
        throw new Error('Method not implemented.');
    }

    protected resetForm() {
        super.resetForm();
        this.voucher = new Voucher();
      }

    protected onCancel() {
        this.location.back();
    }

    protected onCreateForm() {
        super.onCreateForm();
        this.formGroup = this.formbuilder.group({
        });
      }
}
