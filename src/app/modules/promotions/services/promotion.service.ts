import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { IPromotion } from '../interfaces/promotion';

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

    create(promotion: IPromotion) {
        return this.post('', promotion);
    }

    update(promotion: IPromotion) {
        return this.put(promotion._id, promotion);
    }
}
