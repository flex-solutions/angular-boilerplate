import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from './shared/abstract/abstract-rest-service';

@Injectable()
export class AppService extends AbstractRestService {
    protected controllerName = 'app';
    constructor() {
        super();
    }

    getApiVersion(): Observable<any> {
        return this.get('version');
    }
}
