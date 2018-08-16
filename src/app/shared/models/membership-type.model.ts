import { ModelBase } from './model-base';

export class MembershipType extends ModelBase {
  code: string;
  name: string;
  point: number;
  isActive = true;
  isAccumulated = true;
}
