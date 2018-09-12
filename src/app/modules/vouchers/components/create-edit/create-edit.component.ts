import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { VoucherService } from './../../services/vouchers.service';
import { Voucher, VoucherGroupType, VoucherType, VoucherOperationType } from './../../../../shared/models/voucher.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Location } from '@angular/common';
import { POSService } from '../../services/pos.service';
import { POSDto } from '../../../../shared/models/pos.model';
import { VoucherCreationData } from '../../data';
import { MenuItemDto, MenuItemTypeDto } from '../../../../shared/models/menu.model';
import { eq, map } from 'lodash';
import { VoucherFormFactory } from './voucher-form.factory';

@Component({
    selector: 'app-voucher-create-edit',
    templateUrl: './create-edit.component.html',
    // styleUrls: ['./create-edit.component.css']
})
export class CreateEditVoucherComponent extends AbstractFormComponent implements OnInit, AfterViewInit {

    voucher: Voucher = new Voucher();
    voucherId: string;
    isDiscountAmount = true;
    applyMenuType = -1;
    voucherGroupType: VoucherGroupType = VoucherGroupType.Discount;
    voucherOperationType: VoucherOperationType = VoucherOperationType.RepeatOneCode;
    isShowVoucherCodeInput = true;

    poses: POSDto[] = [];
    selectedPoses: any[] = [];

    menuItems: MenuItemDto[] = [];
    selectedMenuItems: any[] = [];
    selectedAttachMenuItems: any[] = [];

    menuItemTypes: MenuItemTypeDto[] = [];
    selectedMenuItemTypes: any[] = [];
    selectedAttachMenuItemTypes: any[] = [];

    applyDays: any[] = [];
    selectedApplyDays: any[] = [];

    applyHours: any[] = [];
    selectedApplyHours: any[] = [];

    createVoucherSuccessMsg: string;

    constructor(private readonly voucherService: VoucherService,
        public readonly translateService: TranslateService,
        private readonly router: Router,
        private readonly posService: POSService,
        private readonly notification: NotificationService,
        public readonly voucherFormFactory: VoucherFormFactory,
        activatedRoute: ActivatedRoute) {
            super();
            activatedRoute.params.subscribe((params: Params) => {
              this.voucherId = params['id'] ? params['id'] : '';
              this.isEdit = params['id'] ? true : false;
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.createVoucherSuccessMsg = this.translateService.translate('voucher-create-success');
        this.getPoses();
        this.getVoucherForEdit();
    }

    ngAfterViewInit() {
      setTimeout(() => {
        this.applyDays = VoucherCreationData.applyDays;
        this.applyHours = VoucherCreationData.applyHours;
      });
    }

    protected onSubmit() {

      this.voucher.type =  this.voucherType;
      this.voucher.operationType = this.voucherOperationType;
      this.voucher.applyPoses = map(this.selectedPoses, 'id');
      this.voucher.applyMenuItemTypes = map(this.selectedMenuItemTypes, 'id');
      this.voucher.applyMenuItems = map(this.selectedMenuItems, 'id');
      this.voucher.applyDays = map(this.selectedApplyDays, 'id');
      this.voucher.applyHourRanges = map(this.selectedApplyHours, 'id');
      this.voucher.attachGiftOfMenuItemTypes = map(this.selectedAttachMenuItemTypes, 'id');
      this.voucher.attachGiftOfMenuItems = map(this.selectedAttachMenuItems, 'id');

      this.voucherService.create(this.voucher).subscribe(() => {
        this.notification.showSuccess(this.createVoucherSuccessMsg);
        this.finish();
      });
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

        this.buildFormGroupBaseOnVoucherType();
        this.buildFormGroupBaseOnVoucherOperationType();
        this.formGroup = this.voucherFormFactory.formGroup;
    }

    private getPoses() {
      this.posService.find().subscribe(poses => {

        this.poses = poses;
      });
    }

    private getMenuItems() {
      this.posService.findMenuItems().subscribe(menuItems => this.menuItems = menuItems);
    }

    private getMenuItemTypes() {
      this.posService.findMenuItemTypes().subscribe(menuItemTypes => this.menuItemTypes = menuItemTypes);
    }

    private getVoucherForEdit() {
      if (!this.isEdit) {
        return;
      }

      this.voucherService.getById(this.voucherId).subscribe(res => {
        this.voucher = res;
        if (this.voucher.type !== VoucherType.XGetY) {
          this.isDiscountAmount = this.voucher.type === VoucherType.DiscountAmount;
          this.voucherGroupType = VoucherGroupType.Discount;
        } else {
          this.voucherGroupType = VoucherGroupType.XGetY;
        }
        this.voucherOperationType = this.voucher.operationType;
      });
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

    get voucherType() {
      if (+this.voucherGroupType === VoucherGroupType.Discount) {
        if (this.isDiscountAmount) {
          return VoucherType.DiscountAmount;
        }
        return VoucherType.DiscountPercent;
      }
      return VoucherType.XGetY;
    }

    onApplyMenuTypeChange() {
      switch (+this.applyMenuType) {
        case 0:
          this.getMenuItemTypes();
          break;
        case 1:
          this.getMenuItems();
          break;
      }
    }

    buildFormGroupBaseOnVoucherType() {
      this.formGroup = this.voucherFormFactory.produceBaseOnVoucherType(this.voucherType);
    }

    buildFormGroupBaseOnVoucherOperationType() {
      this.isShowVoucherCodeInput = !eq(+this.voucherOperationType, +VoucherOperationType.BatchExport);
      this.formGroup = this.voucherFormFactory.produceBaseOnVoucherOperationType(this.voucherOperationType);
    }
}
