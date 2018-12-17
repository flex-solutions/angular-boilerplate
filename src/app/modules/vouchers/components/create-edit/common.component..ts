import { remove, map, join } from 'lodash';
import { Component, Input, AfterViewInit } from '@angular/core';
import { POSDto } from '../../../../shared/models/pos.model';
import { MenuItemDto, MenuItemTypeDto } from '../../../../shared/models/menu.model';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { Voucher, VoucherGroupType } from '../../../../shared/models/voucher.model';
import { POSService } from '../../../pos-and-menu/services/pos';
import { VoucherCreationData } from '../../data';

@Component({
  selector: 'app-common-create-edit-voucher',
  templateUrl: './common.component.html',
})
export class CommonCreateEditVoucherComponent implements AfterViewInit {

  @Input() isEdit: boolean;

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

  applyMenuType = -1;
  voucher: Voucher = new Voucher();
  @Input() voucherGroupType: VoucherGroupType = VoucherGroupType.Discount;

  constructor(private readonly posService: POSService, ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.applyDays = VoucherCreationData.applyDays;
      this.applyHours = VoucherCreationData.applyHours;
    });
  }

  async init() {
    await this.getPosesAsync();
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

  onSelectedPosesChanged() {
    this.removeSelectedMenus();
    this.removeSelectedGiftSet();

    this.getMenuItems();
    this.getMenuItemTypes();
  }

  removeSelectedGiftSet() {
    if (this.voucherGroupType === VoucherGroupType.XGetY) {
      remove(this.selectedAttachMenuItems, item => item.id);
      remove(this.selectedAttachMenuItemTypes, item => item.id);
    }
  }

  submit(voucher: Voucher) {
    this.voucher = voucher;
    this.voucher.applyPoses = map(this.selectedPoses, 'id');
    this.voucher.applyMenuItemTypes = map(this.selectedMenuItemTypes, 'id');
    this.voucher.applyMenuItems = map(this.selectedMenuItems, 'id');
    this.voucher.applyDays = map(this.selectedApplyDays, 'id');
    this.voucher.applyHourRanges = map(this.selectedApplyHours, 'id');
    this.voucher.attachGiftOfMenuItemTypes = map(
      this.selectedAttachMenuItemTypes,
      'id'
    );
    this.voucher.attachGiftOfMenuItems = map(
      this.selectedAttachMenuItems,
      'id'
    );
  }

  assignData(voucher: Voucher) {
    this.voucher = voucher;
    if (
      !isNullOrEmptyOrUndefined(this.voucher.applyPoses) &&
      !isNullOrEmptyOrUndefined(this.poses)
    ) {
      this.selectedPoses = this.poses.filter(
        i =>
          !isNullOrEmptyOrUndefined(
            this.voucher.applyPoses.find(p => p === i._id)
          )
      );
    }
    this.selectedApplyDays = VoucherCreationData.applyDays.filter(
      i =>
        !isNullOrEmptyOrUndefined(
          this.voucher.applyDays.find(p => p === i.id)
        )
    );
    this.selectedApplyHours = VoucherCreationData.applyHours.filter(
      i =>
        !isNullOrEmptyOrUndefined(
          this.voucher.applyHourRanges.find(p => p === i.id)
        )
    );
  }

  private getPosIds(): string {
    let posIds = '';
    if (!isNullOrEmptyOrUndefined(this.selectedPoses)) {
      const ids = map(this.selectedPoses, 'id');
      posIds = join(ids, ';');
    }
    return posIds;
  }

  private removeSelectedMenus() {
    remove(this.selectedMenuItems, item => item.id);
    remove(this.selectedMenuItemTypes, item => item.id);
  }

  private async getPosesAsync() {
    this.poses = await this.posService.find().toPromise();
  }

  private getMenuItems() {
    const posIds = this.getPosIds();
    this.posService
      .findMenuItems(posIds)
      .subscribe(menuItems => {
        this.menuItems = menuItems;
        if (this.isEdit && this.voucher) {
          if (!isNullOrEmptyOrUndefined(this.voucher.applyMenuItems)) {
            this.selectedMenuItems = this.menuItems.filter(
              (i: MenuItemDto) => !isNullOrEmptyOrUndefined(this.voucher.applyMenuItems.find(p => p === i._id)));
          }
          if (!isNullOrEmptyOrUndefined(this.voucher.attachGiftOfMenuItems)) {
            this.selectedAttachMenuItems = this.menuItems.filter(
              (i: MenuItemDto) => !isNullOrEmptyOrUndefined(this.voucher.attachGiftOfMenuItems.find(p => p === i._id)));
          }
        }
      });
  }

  private getMenuItemTypes() {
    const posIds = this.getPosIds();
    this.posService
      .findMenuItemTypes(posIds)
      .subscribe(menuItemTypes => {
        this.menuItemTypes = menuItemTypes;
        if (this.isEdit && this.voucher) {
          if (!isNullOrEmptyOrUndefined(this.voucher.applyMenuItemTypes)) {
            this.selectedMenuItemTypes = this.menuItemTypes.filter(
              (i: MenuItemTypeDto) => !isNullOrEmptyOrUndefined(this.voucher.applyMenuItemTypes.find(p => p === i._id)));
          }
          if (!isNullOrEmptyOrUndefined(this.voucher.attachGiftOfMenuItemTypes)) {
            this.selectedAttachMenuItemTypes = this.menuItemTypes.filter(
              (i: MenuItemTypeDto) => !isNullOrEmptyOrUndefined(this.voucher.attachGiftOfMenuItemTypes.find(p => p === i._id)));
          }
        }
      });
  }
}
