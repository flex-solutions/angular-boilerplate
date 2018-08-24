import { CheckedItem } from '../ui-common/drop-down-check-boxes/checked-items.model';
import { ModelBase } from './model-base';

export enum VoucherGroupType {
  Discount,
  XGetY
}

export enum VoucherType {
  DiscountAmount,
  DiscountPercent,
  XGetY
}

export enum VoucherOperationType {
RepeatOneCode,
BatchExport,
ForMembersOnly,
}

export enum VoucherAdvanceMenuItemPriceAlow {
  Highest = 0,
  MostLow
}

export class Voucher extends ModelBase {
  static validationFields = {
    name: 'name',
    code: 'code',
    discount: 'discount'
  };

  name: string;
  code: string;
  discount: number;
  publishedCount: number;
  usedCount: number;
  status: number;
  sales: number;
  type: VoucherType;
  operationType: VoucherOperationType;
  applyPoses: string[];
  applyMenuItemTypes: string[];
  applyMenuItems: string[];
  applyDays: string[];
  applyHourRanges: string[];
  validFromDate: Date;
  validToDate: Date;
  advApplyMinBillAmount: number;
  advApplyMaxDiscountAmount: number;
  advApplyAllowMenuItemCount: number ;
  advApplyMenuItemAllow: VoucherAdvanceMenuItemPriceAlow;
  advApplyFromMenuItemIndex: number;
}

export enum VoucherStatus {
    running = 0,
    expired
}

export class VoucherFilter {
    name: string;
    create_on: Date;
    status: number[];

    constructor() {
      this.name = '';
      this.create_on = null;
      this.status = [];
    }
  }

export const voucherFilterFields = {
    NAME: 'name',
    CREATE_ON: 'create_on',
    STATUS: 'status'
  };


export class VoucherStatusCheckedItem implements CheckedItem {
  displayName: string;
  status: VoucherStatus;
}
