import { Guid } from 'guid-typescript';
import { ModelBase } from './model-base';
import { Province, District } from './address.model';

class POSOpenTimeDto extends ModelBase {
  weekDays: string;
  time: string;
  internalId: string;
  constructor() {
    super();
    this.internalId = Guid.create().toString();
  }
}

class POSDto extends ModelBase {
  posId: number;
  name: string;
  description: string;
  phoneNumber: string;
  longitude: string;
  latitude: string;
  address: string;
  posParent: string;
  openTimes: POSOpenTimeDto[] = [];
  image: any;
  province: Province;
  district: District;
}

export {POSDto, POSOpenTimeDto};
