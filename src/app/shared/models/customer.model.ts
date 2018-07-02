import { Range } from './../ui-common/input-range/input-range.component';

enum Sex {
  Female = 0,
  Male,
  Other
}

class CustomerModel {
  _id: any;
  phoneNumber: string;
  memberId: string;
  name: string;
  birthday: Date;
  sex: Sex;
  address: string;
  customerType: number;
}

class CustomerFilter {
  phoneNumber: string;
  memberId: string;
  name: string;
  sex: Sex;
  monthOfBirthday: number;
  memberType: any;
  province: any;
  district: any;
  address: string;
  dayAreNotReturned: Range;
  numberOfTimesEaten: Range;
  haveScore: Range;
  spentModelTotal: Range;

  constructor() {
    this.sex = Sex.Female;
    this.monthOfBirthday = (new Date()).getMonth();
    this.name = '';
    this.address = '';
    this.memberId = '';
    this.phoneNumber = '';
  }
}

export { CustomerModel, Sex, CustomerFilter };
