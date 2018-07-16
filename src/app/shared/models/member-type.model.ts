import { ModelBase } from './model-base';

export class MemberType extends ModelBase {
  code: string;
  name: string;
  point: number;
  isActive: boolean;
}
