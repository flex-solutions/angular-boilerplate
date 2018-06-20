import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Promotion } from '../interfaces/promotion';

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
        return this.post('', promotion);
    }

    update(promotion: Promotion) {
        return this.put(promotion._id, promotion);
    }

    deletePromotion(id: string) {
        return this.delete(`${id}/delete`);
    }
}
