import { isNullOrUndefined } from 'util';
import { isNullOrEmptyOrUndefine } from '../../utilities/util';
class District {
  _id: any;
  code: string;
  name: string;

  constructor() {
    this.code = '';
    this.name = '';
  }
}

class Province {
  _id: any;
  code: string;
  name: string;
  districts: District[] = [];

  constructor() {
    this.code = '';
    this.name = '';
    this.districts = [];
  }

  copyFrom(inCity: Province) {
    if (inCity) {
      this._id = inCity._id;
      this.code = inCity.code;
      this.name = inCity.name;
      this.districts = inCity.districts;
    }
  }
}

class Country {
  _id: any;
  code: string;
  name: string;
  provinces: Province[] = [];

  copyFrom(inCountry: Country) {
    if (inCountry) {
      this._id = inCountry._id;
      this.code = inCountry.code;
      this.name = inCountry.name;
      this.provinces = inCountry.provinces;
    }
  }
}

class Address {
  _id: any;
  address: string;
  country: Country = null;

  copyFrom(address: Address) {
    this._id = address._id;
    this.address = '';
    if (!isNullOrEmptyOrUndefine(address.address)) {
      this.address = address.address;
    }
    this.country = new Country();
    this.country.copyFrom(address.country);
  }
}

export { District, Province, Country, Address };
