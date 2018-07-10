
export class Voucher {
    _id: string;
    voucherCode: string;
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
    VOUCHERCODE: 'voucher_code',
    DISCOUNT: 'discount',
    NAME: 'name',
    PUBLISHCOUNT: 'publish_count',
    USEDCOUNT: 'used_count',
    STATUS: 'status',
    SALES: 'sales'
  };
