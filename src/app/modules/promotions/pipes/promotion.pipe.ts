import { DatePipe } from '@angular/common';
import { isNil } from 'ramda';
import { Pipe, PipeTransform } from '@angular/core';
import { Promotion } from '../interfaces/promotion';
import { PromotionStatus } from '../directives/promotion-status.directive';

@Pipe({
    name: 'promotionsFilter'
})
export class PromotionsFilterPipe implements PipeTransform {
    transform(items: Promotion[], searchText: string, status?: PromotionStatus[], startDate?: Date, expireDate?: Date): any[] {
        if (!items) {
            return [];
        }
        let result = items;

        // Filter by search text
        if (searchText) {
            searchText = searchText.toLowerCase();
            result = result.filter(it => {
                return it.title.toLowerCase().includes(searchText) || it.content.toLowerCase().includes(searchText);
            });
        }

        // Filter by status
        if (status) {
            result = result.filter(it => {
                return status.includes(it.status);
            });
        }

        // Filter by start date
        if (startDate) {
            result = result.filter(it => {
                if (it.start_date) {
                    const tmpDate = it.start_date instanceof Date ? it.start_date : new Date(it.start_date);
                    return tmpDate.getTime() >= startDate.getTime();
                }
                return false;
            });
        }

        // Filter by expire date
        if (expireDate) {
            result = result.filter(it => {
                if (it.expire_date) {
                    const tmpDate = it.expire_date instanceof Date ? it.expire_date : new Date(it.expire_date);
                    return tmpDate.getTime() <= expireDate.getTime();
                }
                return false;
            });
        }

        return result;
    }
}

@Pipe({ name: 'promotionDate' })
export class PromotionDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
        if (isNil(value)) {
            return '--';
        } else {
            return super.transform(value, format, timezone, locale);
        }
    }
}
