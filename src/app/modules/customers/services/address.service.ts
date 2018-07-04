import { appVariables } from './../../../app.constant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { CityModel, CountryModel } from '../../../shared/models/district.model';
@Injectable()
export class AddressService extends AbstractRestService {
    protected controllerName: string;
    constructor() {
        super();
        this.controllerName = 'address';
    }

    
    getCities(): CountryModel {
        var cities = localStorage.getItem(appVariables.citiesStorage);
        if (cities) {
            const result = JSON.parse(cities);
            return result as CountryModel;
        }
        this.get().subscribe((result) => {
            localStorage.setItem(appVariables.citiesStorage, JSON.stringify(result));
            return result as CountryModel;
        });
    }

}
