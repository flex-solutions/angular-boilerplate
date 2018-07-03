import { TranslateService } from './../services/translate.service';
import { DistrictModel, CityModel, CountryModel, AddressModel } from './district.model';

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
  birthday: Date = new Date();
  sex: number = 0;
  address: AddressModel = new AddressModel();
  customerType: string = "";
  email: string;
}

class CustomerTypeModel {
  id : number = 0;
  name: string = "";
}

export { CustomerModel, Sex, CustomerTypeModel};
