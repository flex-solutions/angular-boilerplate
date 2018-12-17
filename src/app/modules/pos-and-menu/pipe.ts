import { Pipe, PipeTransform } from '@angular/core';
import { POSDto } from '../../shared/models/pos.model';
import { MenuItemDto } from '../../shared/models/menu.model';
import { isNullOrEmptyOrUndefined } from '../../utilities/util';

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

@Pipe({
    name: 'posMenuFilter'
})
export class POSMenuFilter implements PipeTransform {
    transform(items: MenuItemDto[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText)
            || (isNullOrEmptyOrUndefined(it.itemType) || it.itemType.name.toLowerCase().includes(searchText))
            || it.description.toLowerCase().includes(searchText)
            || it.itemId.toLowerCase().includes(searchText);
        });
    }
}

export const pipes = [
    POSFilter,
    POSMenuFilter
];
