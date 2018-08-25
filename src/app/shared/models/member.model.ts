import { Address } from './address.model';
import { MembershipType } from './membership-type.model';

enum Sex {
  Female = 0,
  Male,
  Other
}

class MemberModel {
  _id: any;
  phoneNumber = '+84';
  memberId: string;
  name: string;
  birthday: Date;
  sex = null;
  address: Address = new Address();
  membershipType: MembershipType;
  email: string;
  point: number;
  isMemberAccumulated: boolean;

  clone(member: MemberModel) {
    this._id = member._id;
    this.memberId = member.memberId;
    this.name = member.name;
    this.birthday = member.birthday;
    this.sex = member.sex;
    this.phoneNumber = member.phoneNumber;
    this.membershipType = member.membershipType;
    this.email = member.email;
    this.point = member.point;
    if (member.address) {
      this.address.copyFrom(member.address);
    }
  }
}

class MemberFilter {
  phoneNumber: string;
  memberId: string;
  name: string;
  sex: any;
  monthOfBirthday: any;
  membershipType: any;
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
    this.membershipType = {};
    this.province = {};
    this.district = {};
  }
}

const memberFilterFields = {
  PHONE_NUMBER: 'phoneNumber',
  MEMBER_ID: 'memberId',
  NAME: 'name',
  MONTH_OF_BIRTHDAY: 'monthOfBirthday',
  SEX: 'sex',
  ADDRESS: 'address.country.provinces',
  MEMBERSHIP_TYPE: 'membershipType',
  PROVINCE: 'province',
  DISTRICT: 'district'
};

const sexResourceKey = {
  Male: 'common_label-sex-man',
  Female: 'common_label-sex-woman',
  Other: 'common_label-sex-other'
};

export { MemberModel, Sex, MemberFilter, memberFilterFields, sexResourceKey };
