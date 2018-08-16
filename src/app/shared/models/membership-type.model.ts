import { ModelBase } from './model-base';

export class MembershipType extends ModelBase {
  static Fields = {
    POINT: 'point'
  };
  code: string;
  name: string;
  point: number;
  isActive = true;
  isAccumulated = true;
}
