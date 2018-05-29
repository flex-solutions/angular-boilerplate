import { UserGroup } from './../../../shared/models/user-group.model';
import { PipeTransform, Pipe } from '@angular/core';

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
