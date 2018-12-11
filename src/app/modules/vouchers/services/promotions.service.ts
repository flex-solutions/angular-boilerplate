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
}
