import { Pipe, PipeTransform } from '@angular/core';
import { POSDto } from '../../shared/models/pos.model';

@Pipe({
    name: 'posFilter'
})
export class POSFilter implements PipeTransform {
    transform(items: POSDto[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText)
            || it.phoneNumber.toLowerCase().includes(searchText)
            || it.address.toLowerCase().includes(searchText);
        });
    }
}

export const pipes = [
    POSFilter,
];
