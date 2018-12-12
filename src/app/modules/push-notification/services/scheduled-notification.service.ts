import { ScheduledNotificationView } from '../models/schedule-notification-view.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { from } from 'rxjs';

@Injectable()
export class ScheduledNotificationService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = ''; // TODO
  }

  count(searchKey: string) {
    return from(new Promise(res => res(10)));
  }

  fetchScheduledNotifications(
    pageNumber: number,
    pageSize: number,
    searchKey?: any
  ) {
    const mockData = [
      {
        name: 'Notification 1',
        title: 'ScheduledNotification',
        content: 'ScheduledNotification',
        schedule: 'ScheduledNotification',
        lastRunAt: new Date()
      },
      {
        name: 'Notification 2',
        title: 'ScheduledNotification',
        content: 'ScheduledNotification',
        schedule: 'ScheduledNotification',
        lastRunAt: new Date()
      }
    ];
    return from(new Promise(res => res(mockData)));
  }

  createScheduledNotification(notification) {
    return from(new Promise(res => res({})));
  }

  updateScheduledNotification(notification) {
    return from(new Promise(res => res({})));
  }
}
