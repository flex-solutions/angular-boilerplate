import { SelectAndAddedModel } from './../../../shared/models/selectable.model';
import { UserGroup } from './../../../shared/models/user-group.model';
import { PipeTransform, Pipe } from '@angular/core';
import { IUserModel } from '../model';
import { isNil, isEmpty } from 'ramda';

@Pipe({
    name: 'userGroupListFilter'
})
export class UserGroupListFilterPipe implements PipeTransform {
    transform(items: UserGroup[], searchText: string): any[] {
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
    name: 'userGroupPermissionSchemeListFilter'
})
export class UserGroupPermissionSchemeListFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
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
    name: 'userListForBulkEditFilter'
})
export class UserListForBulkEditFilter implements PipeTransform {
    transform(items: SelectAndAddedModel<IUserModel>[], searchText: string): any[] {
        if (isNil(items) || isEmpty(items)) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.model.username.toLowerCase().includes(searchText)
                || it.model.email.toLowerCase().includes(searchText)
                || it.model.fullname.toLowerCase().includes(searchText);
        });
    }
}
