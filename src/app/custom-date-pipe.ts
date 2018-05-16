import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgo implements PipeTransform {
     transform(time: Date): Date {
          return new Date();
     }
}

