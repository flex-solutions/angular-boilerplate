import { Address } from './address.model';

enum Sex {
  Female = 0,
  Male,
  Other
}

class CustomerModel {
  _id: any;
  phoneNumber = '+84 ';
  memberId: string;
  name: string;
  birthday: Date;
  sex = null;
  address: Address = new Address();
  customerType = '';
  email: string;
  point: number;
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
    this.sex = {};
    this.monthOfBirthday = {};
    this.customerType = {};
    this.province = {};
    this.district = {};
  }
}

const customerFilterFields = {
  PHONE_NUMBER: 'phoneNumber',
  MEMBER_ID: 'memberId',
  NAME: 'name',
  MONTH_OF_BIRTHDAY: 'monthOfBirthday',
  SEX: 'sex',
  ADDRESS: 'address',
  CUSTOMER_TYPE: 'customerType',
  PROVINCE: 'province',
  DISTRICT: 'district'
};

export {
  CustomerModel,
  Sex,
  CustomerFilter,
  customerFilterFields
};
