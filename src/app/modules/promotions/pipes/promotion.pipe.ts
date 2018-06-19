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
