import { Address } from './address.model';

enum Sex {
  Female = 0,
  Male,
  Other
}

class CustomerModel {
  _id: any;
  phoneNumber = '+84';
  memberId: string;
  name: string;
  birthday: Date;
  sex = null;
  address: Address = new Address();
  customerType = '';
  email: string;
  point: number;

  clone(cus: CustomerModel ) {
    this._id = cus._id;
    this.memberId = cus.memberId;
    this.name = cus.name;
    this.birthday = cus.birthday;
    this.sex = cus.sex;
    this.phoneNumber = cus.phoneNumber;
    this.customerType = cus.customerType;
    this.email = cus.email;
    this.point = cus.point;
    if (cus.address) {
      this.address.copyFrom(cus.address);
    }
  }
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
  ADDRESS: 'address.country.provinces',
  CUSTOMER_TYPE: 'customerType',
  PROVINCE: 'address.country.provinces',
  DISTRICT: 'address.country.provinces[0].districts[0].name'
};

const sexResourceKey = {
  Male: 'common_label-sex-man',
  Female: 'common_label-sex-woman',
  Other: 'common_label-sex-other'
};

export {
  CustomerModel,
  Sex,
  CustomerFilter,
  customerFilterFields,
  sexResourceKey
};
