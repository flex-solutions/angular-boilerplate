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

export { CustomerModel, Sex };
