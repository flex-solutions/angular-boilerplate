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
CustomerCare,
}

export enum VoucherAdvanceMenuItemPriceAlow {
  Highest = 0,
  MostLow
}

export const VoucherApplyHourRanges = {
  ZERO_ONE: {from: 0, to: 1},
  ONE_TWO: {from: 1, to: 2},
  TWO_THREE: {from: 2, to: 3},
  THREE_FOUR: {from: 3, to: 4},
  FOUR_FIVE: {from: 4, to: 5},
  FIVE_SIX: {from: 5, to: 6},
  SIX_SEVEN: {from: 6, to: 7},
  SEVEN_EIGHT: {from: 7, to: 8},
  EIGHT_NINE: {from: 8, to: 9},
  NINE_TEN: {from: 9, to: 10},
  TEN_OO: {from: 10, to: 11},
  OO_OT: {from: 11, to: 12},
  OT_OTH: {from: 12, to: 13},
  OTH_OF: {from: 13, to: 14},
  OF_OFI: {from: 14, to: 15},
  OFI_OS: {from: 15, to: 16},
  OS_OSE: {from: 16, to: 17},
  OSE_OE: {from: 17, to: 18},
  OE_ON: {from: 18, to: 19},
  ON_TZ: {from: 19, to: 20},
  TZ_TO: {from: 20, to: 21},
  TO_TT: {from: 21, to: 22},
  TT_TTH: {from: 22, to: 23},
  TTH_TF: {from: 23, to: 24}
};

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
  attachGiftOfMenuItemTypes: string[];
  attachGiftOfMenuItems: string[];
  numberBuyItem: number;
  numberGiftItem: number;
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

    constructor() {
      this.name = '';
      this.create_on = null;
    }
  }

export const voucherFilterFields = {
    NAME: 'name',
    CREATE_ON: 'create_on',
};

export class VoucherOperationDtoBase {
  start_date: Date;
  end_date: Date;
  voucher: Voucher;
}
export class RepeatOneCodeDto extends VoucherOperationDtoBase {
  usageLimit: number;
}

export class BatchExportCodeDto extends VoucherOperationDtoBase {
  minRange: number;
  maxRange: number;
  prefix: string;
}
