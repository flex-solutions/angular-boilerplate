import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Promotion, IGiveVoucherModel } from '../interfaces/promotion';
import { PromotionStatus } from '../directives/promotion-status.directive';
import { convertStringToBase64 } from '../../../utilities/convertStringToBase64';

@Injectable()
export class PromotionService extends AbstractRestService {

  protected controllerName: string;

  constructor() {
    super();
    this.controllerName = 'promotions';
  }

  getPromotion(id) {
    return this.get(id);
  }

  create(promotion: Promotion) {
    this.updateBanner(promotion);
    return this.post('', promotion);
  }

  update(promotion: Promotion) {
    this.updateBanner(promotion);
    return this.put(promotion._id, promotion);
  }

  updateMemberFilter(promotionId: string, memberFilter: any) {
    return this.patch(`${promotionId}/update-member-filter`, memberFilter);
  }

  count(query?: any): Observable<number> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter('count', query);
  }

  getPromotions(
    pageNumber: number,
    pageSize: number,
    query?: any
  ): Observable<Promotion[]> {
    if (!query) {
      query = {};
    }
    return this.getWithFilter(
      `?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      query
    );
  }

  deletePromotion(id: string) {
    return this.delete(`${id}`);
  }

  start(promotionId: string, promotion: Promotion) {
    return this.patch(`${promotionId}/start`, promotion);
  }

  stop(promotionId: string) {
    return this.patch(`${promotionId}/stop`, {});
  }

  private updateBanner(promotion: Promotion) {
    // Convert banner to base64 if not
    promotion.banner = convertStringToBase64(promotion.banner);
  }

  giveVoucher(model: IGiveVoucherModel): Observable<Response> {
    return this.post('give-voucher', model);
  }
}
