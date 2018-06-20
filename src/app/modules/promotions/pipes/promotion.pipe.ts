import { DatePipe } from '@angular/common';
import { isNil } from 'ramda';
import { Pipe, PipeTransform } from '@angular/core';
import { Promotion } from '../interfaces/promotion';

@Pipe({
    name: 'promotionsFilter'
})
export class PromotionsFilterPipe implements PipeTransform {
    transform(items: Promotion[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.title.toLowerCase().includes(searchText) || it.content.toLowerCase().includes(searchText);
        });
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
