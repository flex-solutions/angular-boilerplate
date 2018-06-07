import { Pipe, PipeTransform } from '@angular/core';
import { ControllerSelectedItem, PermissionDetail, IPermissionScheme } from '../../../shared/models/permission-scheme.model';
import { UserGroup } from '../../../shared/models/user-group.model';
import { SelectAndAddedModel } from '../../../shared/models/selectable.model';

@Pipe({
    name: 'controllerFilter'
})
export class ControllerFilterPipe implements PipeTransform {
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
export class PermissionFilterPipe implements PipeTransform {
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

@Pipe({
    name: 'schemeFilter'
})
export class PermissionSchemeFilter implements PipeTransform {
    transform(items: IPermissionScheme[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText);
        });
    }
}

@Pipe({
    name: 'userGroupFilter'
})
export class UserGroupFilter implements PipeTransform {
    transform(items: SelectAndAddedModel<UserGroup>[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.model.name.toLowerCase().includes(searchText);
        });
    }
}

export const PermissionSchemePipes = [
    PermissionFilterPipe,
    ControllerFilterPipe,
    PermissionSchemeFilter,
    UserGroupFilter
];
