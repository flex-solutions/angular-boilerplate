import { Observable, from } from 'rxjs';
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
  ): Observable<CustomerModel[]> {
    return this.get(`?pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  count(): Observable<number> {
    return this.get('count');
  }

  getCustomersWithFilterQuery(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<CustomerModel[]> {
    if (!query) {
      query = {};
    }
    return this.filter(
      `filter?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      query
    );
  }

  countWithFilterQuery(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }

    const promise = new Promise((_resolve, reject) => {
      this.filter(`filter`, query).subscribe((data: any[]) => {
        if (data && data.hasOwnProperty('length')) {
          console.log(`resolve data: [${data.length}]`);
          _resolve(data.length);
        }
        _resolve(0);
      });
    });

    return from(promise) as Observable<number>;
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
