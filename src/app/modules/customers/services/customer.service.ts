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

  getCustomers(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<CustomerModel[]> {
    if (query) {
      return this.filter(
        `?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        query
      );
    }
    return this.get(`?pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  count(query?: any): Observable<number> {
    if (query) {
      return this.filter('count', query);
    }
    return this.get(`count`);
  }
}
