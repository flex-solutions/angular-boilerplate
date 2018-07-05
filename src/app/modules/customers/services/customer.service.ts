import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { CustomerModel } from '../../../shared/models/customer.model';
import { sleep } from '../../../utilities/util';
import { CustomerMockData } from './customer-filter.mock';
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
    if (!query) {
      query = {};
    }
    return this.filter(`?pageSize=${pageSize}&pageNumber=${pageNumber}`, query);
  }

  count(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }
    return this.filter(`count`, query);
  }

  getProvinces() {
    return new Promise((resolve, reject) => {
      sleep(500);
      const data = CustomerMockData.provincesMock;
      resolve(data);
    });
  }

  getMemberType() {
    return new Promise((resolve, reject) => {
      sleep(500);
      const data = CustomerMockData.memberTypeMock;
      resolve(data);
    });
  }

  getMonthBirthday() {
    return new Promise((resolve, reject) => {
      sleep(500);
      const data = CustomerMockData.months;
      resolve(data);
    });
  }
}
