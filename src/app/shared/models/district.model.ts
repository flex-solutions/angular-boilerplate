
class DistrictModel {
    _id: any;
    code: string;
    name: string;
  }
  
  class CityModel {
    _id: any;
    code: string;
    name: string;
    districts: DistrictModel[] = [];

    clone(inCity : CityModel) {
      this._id = inCity._id;
      this.code = inCity.code;
      this.name = inCity.name;
      this.districts = inCity.districts;
    }
  }

  class CountryModel {
    _id: any;
    code: string;
    name: string;
    provinces: CityModel[] = [];

    clone(inCountry : CountryModel) {
      this._id = inCountry._id;
      this.code = inCountry.code;
      this.name = inCountry.name;
      this.provinces = inCountry.provinces;
    }
  }

  class AddressModel {
    _id: any;
    address: string;
    country: CountryModel = new CountryModel();
  }
  export {DistrictModel, CityModel, CountryModel, AddressModel}