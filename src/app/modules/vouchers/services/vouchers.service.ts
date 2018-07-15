import { Observable, from } from 'rxjs';
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

  public remove(_id: string) {
    return this.delete(_id, {});
  }

  countWithFilterQuery(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }
    return this.filter(
      `count?`, query
    );
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
