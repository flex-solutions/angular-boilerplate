import { Observable } from 'rxjs';
import * as moment from 'moment';
import {
  Voucher,
  VoucherOperationDtoBase
} from './../../../shared/models/voucher.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { MembershipType } from '../../../shared/models/membership-type.model';
import { DateRangeModel } from '../../../shared/ui-common/datepicker/model/date-range.model';

@Injectable()
export class VoucherService extends AbstractRestService {
  protected controllerName = 'voucher';

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

  getAllVoucherCareCampaign(): Observable<Voucher[]> {
    return this.get('voucher-care-campaign');
  }

  getMembershipTypes(id: string): Observable<MembershipType[]> {
    return this.get(`${id}/membership-types`);
  }

  initAffectTime() {
    const startDate = moment();
    const endDate = startDate.clone().add({days: 1}).set({hour: 23, minute: 59});

    const dateRange = new DateRangeModel();
    dateRange.startDate = startDate.toDate();
    dateRange.endDate = endDate.toDate();

    return dateRange;
  }
}
