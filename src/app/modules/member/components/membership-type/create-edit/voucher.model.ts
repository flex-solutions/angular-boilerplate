import { Voucher } from './../../../../../shared/models/voucher.model';

export enum BenefitScheduleType {
  ReachRank,
  RepeatAtBirthday,
  RepeatAtSpecificDate,
  GetXPoints
}

export interface VoucherBenefit {
  campaignName: string;
  voucher: Voucher;
  voucherCode: string;
  voucherName: string;
  validDateCount: number;
  schedule: BenefitScheduleType;
  selectedDate?: Date;
}
