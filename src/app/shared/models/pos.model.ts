import { ModelBase } from './model-base';

class POSDto extends ModelBase {
  posId: number;
  name: string;
  description: string;
  phoneNumber: string;
  longitude: string;
  latitude: string;
  address: string;
  posParent: string;
  openTime: string;
}

export {POSDto};
