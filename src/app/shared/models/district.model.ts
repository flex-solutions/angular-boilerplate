
class DistrictModel {
    code: string;
    name: string;
  }
  
  class CityModel {
    _id: any;
    code: string;
    name: string;
    districts: DistrictModel[] = [];
  }

  class CountryModel {
    _id: any;
    code: string;
    name: string;
    provinces: CityModel[] = [];
  }

  class AddressModel {
    _id: any;
    address: string;
    country: CountryModel = new CountryModel();
  }
  export {DistrictModel, CityModel, CountryModel, AddressModel}