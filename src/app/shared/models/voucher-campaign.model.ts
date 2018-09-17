import { Voucher } from './voucher.model';
import { ModelBase } from './model-base';

class VoucherRunning extends ModelBase {
  voucher: Voucher;
  minRange: number;
  maxRange: number;
  usedCount: number;
  start_date: Date;
  end_date: Date;
  running_details: VoucherTracking[] = [];
}

class VoucherTracking extends ModelBase {
  membership_id: string;
  publish_code: string;
  is_used: boolean;
  used_date: Date;
}

export {VoucherRunning, VoucherTracking};
