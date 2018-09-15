import { POSService } from './../../../pos-and-menu/services/pos';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { VoucherService } from './../../services/vouchers.service';
import { Voucher, VoucherGroupType, VoucherType, VoucherOperationType } from './../../../../shared/models/voucher.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { POSDto } from '../../../../shared/models/pos.model';
import { VoucherCreationData } from '../../data';
import { MenuItemDto, MenuItemTypeDto } from '../../../../shared/models/menu.model';
import { eq, map, remove, join, find } from 'lodash';
import { VoucherFormFactory } from './voucher-form.factory';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';

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
        if (!this.isEdit) {
          this.getPoses();
        } else {
          this.getVoucherForEdit();
        }
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

      if (!this.isEdit) {
        this.voucherService.create(this.voucher).subscribe(() => {
          this.notification.showSuccess(this.createVoucherSuccessMsg);
          this.finish();
        });
      } else {
        this.voucherService.update(this.voucher).subscribe(() => {
          this.notification.showSuccess(`Voucher "${this.voucher.name}" has been updated`);
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
      const posIds = this.getPosIds();
      this.posService.findMenuItems(posIds).subscribe(menuItems => this.menuItems = menuItems);
    }

    private getMenuItemTypes() {
      const posIds = this.getPosIds();
      this.posService.findMenuItemTypes(posIds).subscribe(menuItemTypes => this.menuItemTypes = menuItemTypes);
    }

    private getVoucherForEdit() {
      this.voucherService.getById(this.voucherId).subscribe(res => {
        this.voucher = res;
        if (this.voucher.type !== VoucherType.XGetY) {
          this.isDiscountAmount = this.voucher.type === VoucherType.DiscountAmount;
          this.voucherGroupType = VoucherGroupType.Discount;
        } else {
          this.voucherGroupType = VoucherGroupType.XGetY;
        }
        this.voucherOperationType = this.voucher.operationType;

        this.getPoses();
      });
    }

    private removeSelectedGiftSet() {
      if (this.voucherGroupType === VoucherGroupType.XGetY) {
        remove(this.selectedAttachMenuItems, item => item.id);
        remove(this.selectedAttachMenuItemTypes, item => item.id);
      }
    }

    private removeSelectedMenus() {
      remove(this.selectedMenuItems, item => item.id);
      remove(this.selectedMenuItemTypes, item => item.id);
    }

    private getPosIds(): string {
      let posIds = '';
      if (!isNullOrEmptyOrUndefined(this.selectedPoses)) {
        const ids = map(this.selectedPoses, 'id');
        posIds = join(ids, ';');
      }
      return posIds;
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
      this.removeSelectedMenus();
      this.removeSelectedGiftSet();
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
      this.removeSelectedGiftSet();
      this.formGroup = this.voucherFormFactory.produceBaseOnVoucherType(this.voucherType);
    }

    buildFormGroupBaseOnVoucherOperationType() {
      this.isShowVoucherCodeInput = !eq(+this.voucherOperationType, +VoucherOperationType.BatchExport);
      this.formGroup = this.voucherFormFactory.produceBaseOnVoucherOperationType(this.voucherOperationType);
    }

    onSelectedPosesChanged() {
      this.removeSelectedMenus();
      this.removeSelectedGiftSet();

      this.getMenuItems();
      this.getMenuItemTypes();
    }
}
