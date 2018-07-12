import { Observable,from } from 'rxjs';
import { Voucher } from './../../../shared/models/voucher.model';
import { ExDialog } from './../../../shared/ui-common/modal/services/ex-dialog.service';

import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';

@Injectable()
export class VoucherService extends AbstractRestService {
  protected controllerName: string;
  constructor(private exDialog: ExDialog) {
    super();
    this.controllerName = 'vouchers';
  }

  getvouchers(pageSize: number, pageNumber: number, searchKey?: string): Observable<Voucher[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  public remove(_id: string) {
    return this.delete(_id, {});
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

  getVouchersWithFilterQuery(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<Voucher[]> {
    if (!query) {
      query = {};
    }
    return this.filter(
      `filter?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      query
    );
  }
}
