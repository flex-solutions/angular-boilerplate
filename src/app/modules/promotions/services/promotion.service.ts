import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Promotion } from '../interfaces/promotion';
import { PromotionStatus } from '../directives/promotion-status.directive';

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

    getPromotions(pageSize: number, pageNumber: number, searchKey?: string, status?: PromotionStatus[], startDate?: Date,
        endDate?: Date) {
        const query = this.buildSearchQuery(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`, status,
            startDate, endDate);

        return this.get(query);
    }

    count(searchKey?: string, status?: PromotionStatus[], startDate?: Date,
        endDate?: Date) {
        const query = this.buildSearchQuery(`count?searchKey=${searchKey}`, status, startDate, endDate);
        return this.get(query);
    }

    deletePromotion(id: string) {
        return this.delete(`${id}`);
    }

    private buildSearchQuery(currentQuery: string, status?: PromotionStatus[], startDate?: Date,
        endDate?: Date): string {
        let query = currentQuery;
        // Build search query
        if (status) {
            status.forEach(i => {
                query += `&status=${i}`;
            });
        }

        if (startDate) {
            query += `&startDate=${startDate.toISOString()}`;
        }

        if (endDate) {
            query += `&endDate=${endDate.toISOString()}`;
        }
        return query;
    }
}