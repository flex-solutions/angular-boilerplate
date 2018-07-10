import { Address } from './address.model';

enum Sex {
  Female = 0,
  Male,
  Other
}

class CustomerModel {
  _id: any;
  phoneNumber: string = "+84 ";
  memberId: string;
  name: string;
  birthday: Date = new Date();
  sex: number = 0;
  address: Address = new Address();
  customerType: string = "";
  email: string;
}

class CustomerTypeModel {
  id : number = 0;
  name: string = "";
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

export { CustomerModel, Sex, CustomerFilter, customerFilterFields, CustomerTypeModel };
