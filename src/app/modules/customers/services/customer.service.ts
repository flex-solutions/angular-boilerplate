import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { CustomerModel } from '../../../shared/models/customer.model';
@Injectable()
export class CustomerService extends AbstractRestService {
    protected controllerName: string;
    constructor() {
        super();
        this.controllerName = 'customers';
    }

    getCustomers(pageNumber: number, pageSize: number): Observable<CustomerModel[]> {
        return this.get(`?searchKey=&pageSize=${pageSize}&pageNumber=${pageNumber}`);
    }

    count(): Observable<number> {
        return this.get(`count?searchKey=`);
    }
}
