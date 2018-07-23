import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { CustomerModel } from '../../../shared/models/customer.model';
import { sleep } from '../../../utilities/util';
import { CustomerMockData } from './customer-filter.data';

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
    return this.filter('count', query);
  }

  getCustomers(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<CustomerModel[]> {
    if (!query) {
      query = {};
    }
    return this.filter(`?pageSize=${pageSize}&pageNumber=${pageNumber}`, query);
  }

  getMonthBirthday() {
    return new Promise((resolve, reject) => {
      sleep(200);
      const data = CustomerMockData.months;
      resolve(data);
    });
  }

  public getById(_id: string): Observable<CustomerModel> {
    return this.get(`${_id}`);
  }

  create(news: CustomerModel) {
    return this.post('', news);
  }

  update(news: CustomerModel) {
    return this.put('', news);
  }
}
