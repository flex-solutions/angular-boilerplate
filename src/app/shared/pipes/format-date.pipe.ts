import {Pipe, Injectable, PipeTransform} from '@angular/core';

declare let moment: any;

@Pipe({
  name: 'dateFormat'
})

@Injectable()
export class DateFormat implements PipeTransform {
  transform(rawDate: any, arg: any): any {
    if (rawDate) {
      return moment(rawDate).format('DD/MM/YYYY');
    } else {
      return '';
    }
  }
}
@Pipe({
  name: 'dateTimeFormat'
})

@Injectable()
export class DateTimeFormat implements PipeTransform {
  transform(rawDate: any, arg: any): any {
    if (rawDate) {
      return moment(rawDate).format('DD/MM/YYYY HH:mm');
    } else {
      return '';
    }
  }
}
