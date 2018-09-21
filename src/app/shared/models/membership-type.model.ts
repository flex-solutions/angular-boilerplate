import { ModelBase } from './model-base';
import { Voucher } from './voucher.model';

export enum BenefitScheduleType {
  ReachRank,
  RepeatAtBirthday,
  RepeatAtSpecificDate,
  GetXPoints
}

export class VoucherBenefit {
  voucherBenefitId: string;
  campaignName: string;
  voucher: Voucher;
  voucherCode: string;
  voucherName: string;
  validDateCount: number;
  schedule: BenefitScheduleType;
  selectedDate?: Date;
  selectedPoint?: number;
}

export class MembershipType extends ModelBase {
  static Fields = {
    POINT: 'point'
  };
  code: string;
  name: string;
  point: number;
  isActive = true;
  isAccumulated = true;
  staticBenefits: Array<VoucherBenefit>;
  nonBenefits: Array<string>;
  benefits: Array<string>;
}
