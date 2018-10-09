import { Observable } from 'rxjs';
import {
  Voucher,
  VoucherOperationDtoBase
} from './../../../shared/models/voucher.model';
import { ExDialog } from './../../../shared/ui-common/modal/services/ex-dialog.service';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { MembershipType } from '../../../shared/models/membership-type.model';

@Injectable()
export class VoucherService extends AbstractRestService {
  protected controllerName: string;

  constructor(private exDialog: ExDialog) {
    super();
    this.controllerName = 'voucher';
  }

  public remove(_id: string) {
    return this.delete(`${_id}`);
  }

  countWithFilterQuery(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter(`count?`, query);
  }

  getVouchersWithFilterQuery(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<Voucher[]> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter(
      `filter?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      query
    );
  }

  create(dto: Voucher) {
    return this.post('', dto);
  }

  update(voucher: Voucher): any {
    return this.put('', voucher);
  }

  getById(id: string): Observable<Voucher> {
    return this.get(`${id}`);
  }

  runVoucher<T extends VoucherOperationDtoBase>(
    dto: T,
    type: number
  ): Observable<Response> {
    return this.post(`run-voucher?type=${type}`, dto);
  }

  getVouchersRunning(): Observable<any[]> {
    return this.get('vouchers-running');
  }

  getAllVoucherCareCampaign(): Observable<Voucher[]> {
    return this.get('voucher-care-campaign');
  }

  getMembershipTypes(id: string): Observable<MembershipType[]> {
    return this.get(`${id}/membership-types`);
  }
}
