import { Observable } from 'rxjs';
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
}
