import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { PipeDecorator } from '@angular/core/src/metadata/directives';

@Pipe({
     name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
     transform(items: User[], searchText: string): any[] {
          if (!items) {
               return [];
          }
          if (!searchText) {
               return items;
          }
          searchText = searchText.toLowerCase();
          return items.filter(it => {
               return it.username.toLowerCase().includes(searchText)
                    || it.fullname.toLowerCase().includes(searchText)
                    || it.email.toLowerCase().includes(searchText);
          });
     }
}

@Pipe({
     name: 'statusPipe'
})
export class SatusPipe implements PipeTransform {
     transform(value: boolean): string {
          let msg = 'false';
          if (value) {
               msg = 'success';
          }

          return msg;
     }
}
