import { appVariables } from './../../../app.constant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { CityModel, CountryModel } from '../../../shared/models/district.model';
@Injectable()
export class AddressService extends AbstractRestService {
    protected controllerName: string;
    private cities: CountryModel = null;

    constructor() {
        super();
        this.controllerName = 'address';
    }


    getCities(): CountryModel {
        if (this.cities) {
            return this.cities;
        }

        var result = localStorage.getItem(appVariables.citiesStorage);
        if (result) {
            this.cities = JSON.parse(result) as CountryModel;
            return this.cities;
        }

        this.get().subscribe((result) => {
            localStorage.setItem(appVariables.citiesStorage, JSON.stringify(result));
            this.cities = result as CountryModel
            return this.cities;
        });

    }

}
