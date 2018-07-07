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
  sex: any;
  monthOfBirthday: any;
  customerType: any;
  province: any;
  district: any;
  address: string;

  constructor() {
    this.name = '';
    this.address = '';
    this.memberId = '';
    this.phoneNumber = '';
    this.sex = { id: Sex.Female };
    this.monthOfBirthday = { id: 1 };
    this.customerType = { id: 0 };
  }
}

const customerFilterFields = {
  PHONE_NUMBER: 'phoneNumber',
  MEMBER_ID: 'memberId',
  NAME: 'name',
  MONTH_OF_BIRTHDAY: 'monthOfBirthday',
  SEX: 'sex',
  ADDRESS: 'address',
  CUSTOMER_TYPE: 'customerType'
};

export { CustomerModel, Sex, CustomerFilter, customerFilterFields };
