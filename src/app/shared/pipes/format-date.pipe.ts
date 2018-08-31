import {Pipe, Injectable, PipeTransform} from '@angular/core';

declare let moment: any;

@Pipe({
  name: 'dateFormat'
})

@Injectable()
export class DateFormat implements PipeTransform {
  transform(rawDate: any, arg: any): any {
    if (rawDate) {
      const localDate: Date = moment(rawDate).toDate();
      return moment(localDate).format('DD - MM - YYYY');
    } else {
      return '';
    }
  }
}
