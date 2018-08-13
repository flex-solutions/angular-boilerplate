import { Observable, from } from 'rxjs';
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

  count(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter('count', query);
  }

  getCustomers(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<CustomerModel[]> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter(`?pageSize=${pageSize}&pageNumber=${pageNumber}`, query);
  }

  public getById(_id: string): Observable<CustomerModel> {
    return this.get(`${_id}`);
  }

  create(member: CustomerModel): Observable<Response> {
    return this.post('', member);
  }

  update(member: CustomerModel): Observable<Response> {
    return this.put('', member);
  }
}
