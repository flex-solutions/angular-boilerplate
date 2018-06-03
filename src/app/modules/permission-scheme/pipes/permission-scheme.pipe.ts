import { Pipe, PipeTransform } from '@angular/core';
import { ControllerSelectedItem, PermissionDetail } from '../../../shared/models/permission-scheme.model';

@Pipe({
    name: 'controllerFilter'
})
class ControllerFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.controller.name.toLowerCase().includes(searchText);
        });
    }
}

@Pipe({
    name: 'permissionFilter'
})
class PermissionFilterPipe implements PipeTransform {
    transform(items: PermissionDetail[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.controller_name.toLowerCase().includes(searchText);
        });
    }
}

export {PermissionFilterPipe, ControllerFilterPipe};
