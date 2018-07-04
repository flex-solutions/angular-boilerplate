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

    getCities(): Observable<CountryModel> {
        return this.get();
    }

}
