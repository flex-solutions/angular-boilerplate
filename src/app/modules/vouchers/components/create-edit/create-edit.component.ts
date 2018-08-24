import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from './../../../../shared/services/translate.service';
import { VoucherService } from './../../services/vouchers.service';
import { Voucher } from './../../../../shared/models/voucher.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Location } from '@angular/common';
import { POSService } from '../../services/pos.service';
import { POSDto } from '../../../../shared/models/pos.model';
import { VoucherCreationData } from '../../data';
import { MenuItemDto, MenuItemTypeDto } from '../../../../shared/models/menu.model';
import { isEmpty } from 'lodash';

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

    poses: POSDto[] = [];
    menuItems: MenuItemDto[] = [];
    menuItemTypes: MenuItemTypeDto[] = [];
    applyDays: any[] = [];
    applyHours: any[] = [];

    constructor(private readonly voucherService: VoucherService,
        public readonly translateService: TranslateService,
        private readonly location: Location,
        private readonly formbuilder: FormBuilder,
        private readonly posService: POSService,
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
        this.getPoses();
    }

    ngAfterViewInit() {
      setTimeout(() => {
        this.applyDays = VoucherCreationData.applyDays;
        this.applyHours = VoucherCreationData.applyHours;
      });
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
}
