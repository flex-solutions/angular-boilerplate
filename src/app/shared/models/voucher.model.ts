import { CheckedItem } from "../ui-common/drop-down-check-boxes/checked-items.model";

export class Voucher {
    _id: string;
    voucher_code: string;
    discount: number;
    name: string;
    published_count:number;
    used_count: number;
    status: number;
    sales: number;
    create_on: Date;
}

export enum VoucherStatus {
    running = 0,
    expired
}

export const VoucherFields = {
    ID: '_id',
    VOUCHER_CODE: 'voucher_code',
    DISCOUNT: 'discount',
    NAME: 'name',
    PUBLISHED_COUNT: 'published_count',
    USED_COUNT: 'used_count',
    STATUS: 'status',
    SALES: 'sales',
    CREATE_ON: 'create_on'
  };

export class VoucherFilter {
    name: string;
    create_on: Date;
    status:number[];

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