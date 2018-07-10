import { appVariables } from './../../../app.constant';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Country } from '../../../shared/models/address.model';

@Injectable()
export class AddressService extends AbstractRestService {
  protected controllerName: string;
  private cities: Country = null;

  constructor() {
    super();
    this.controllerName = 'address';
    this.initialize();
  }

  initialize() {
    const result = localStorage.getItem(appVariables.citiesStorage);
    if (!result) {
      this.get().subscribe(country => {
        localStorage.setItem(
          appVariables.citiesStorage,
          JSON.stringify(country)
        );
        this.cities = country as Country;
      });
    }
  }

  getCountry(): Country {
    if (this.cities) {
      return this.cities;
    }

    const result = localStorage.getItem(appVariables.citiesStorage);
    if (result) {
      this.cities = JSON.parse(result) as Country;
      return this.cities;
    }
  }
}
