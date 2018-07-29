import { appVariables } from './../../../app.constant';
import { Injectable } from '@angular/core';
import { AbstractRestService } from './../../../shared/abstract/abstract-rest-service';
import {
  Country,
  Province,
  District
} from './../../../shared/models/address.model';
import { isNullOrEmptyOrUndefine } from '../../../utilities/util';

@Injectable()
export class AddressService extends AbstractRestService {
  protected controllerName: string;
  private country: Country = null;

  constructor() {
    super();
    this.controllerName = 'address';
  }

  // Get the list of city or province
  async getCityProvinces() {
    const selectedCountry = await this.ensureGetCountry();
    return selectedCountry.provinces;
  }

  // Get the list of district with specific city province code
  async getDistricts(cityProvinceCode: string) {
    const selectedCountry = await this.ensureGetCountry();
    const selectedCityProvince = selectedCountry.provinces.find(
      p => p.code === cityProvinceCode
    );
    return selectedCityProvince.districts;
  }

  // Get the country
  async getCountry(): Promise<Country> {
    // Get from local storage
    if (!this.country) {
      const result = localStorage.getItem(appVariables.citiesStorage);
      if (result) {
        this.country = JSON.parse(result) as Country;
      }
    }

    // Exist in local storage
    if (this.country) {
      return this.country;
    } else {
      // Fetch country from server side
      const currentCountry = (await this.get().toPromise()) as Country;

      // Save in local storage
      localStorage.setItem(
        appVariables.citiesStorage,
        JSON.stringify(currentCountry)
      );
      this.country = currentCountry;
      return currentCountry;
    }
  }

  async ensureGetCountry() {
    // Determine country have already initialize
    let selectedCountry = this.country;

    // If have not yet initialize, get in local storage or api
    if (isNullOrEmptyOrUndefine(selectedCountry)) {
      selectedCountry = await this.getCountry();
    }
    return selectedCountry;
  }
}
