import { add } from 'ramda';
import { appVariables } from './../../../app.constant';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Country, District, Province } from '../../../shared/models/address.model';

@Injectable()
export class AddressService extends AbstractRestService {
  protected controllerName: string;
  private country: Country = null;

  constructor() {
    super();
    this.controllerName = 'address';
  }

  async getCountry() {
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
      const currentCountry = await this.get().toPromise();
      localStorage.setItem(
        appVariables.citiesStorage,
        JSON.stringify(currentCountry)
      );
      this.country = currentCountry as Country;
      return currentCountry;
    }
  }
}
