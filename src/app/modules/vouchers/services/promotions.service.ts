import { Voucher } from './../../../shared/models/voucher.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Observable } from 'rxjs';

@Injectable()
export class PromotionsService extends AbstractRestService {
  protected controllerName = 'promotions';

  getVouchersRunning(): Observable<any[]> {
    return this.get('');
  }

  deleteVoucherRunning(id: any): Observable<Response> {
    return this.delete(`${id}`);
  }

  getVoucher(voucherCode: string): Observable<Voucher> {
    return this.get(`${voucherCode}`);
  }

  exportBatchVoucher(id: string, fileName: string) {
    this.download(fileName, `export-batch-voucher/${id}`);
  }

  updateVoucher(id: string, voucher: Voucher) {
    return this.patch(`${id}/update-voucher`, voucher);
  }

  countRemainingCodes(id: string, searchKey: string): Observable<number> {
    return this.get(`${id}/count-remaining-codes?searchKey=${searchKey}`);
  }

  getRemainingCodes(id: string, searchKey: string, pageSize: number, pageNumber: number): Observable<any[]> {
    return this.get(`${id}/remaining-codes?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  deleteRunningTracking(runningId: string, _id: any) {
    return this.delete(`${runningId}/delete-tracking/${_id}`);
  }

  manualUseVoucherCode(publish_code: string, membership_id: string, billId: any) {
    const payload = {
      publishCode: publish_code,
      memberId: membership_id,
      billId: billId,
    };

    return this.patch('manual-use-voucher', payload);
  }
}
