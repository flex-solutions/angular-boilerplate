import { ScheduledNotificationView } from '../models/schedule-notification-view.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { from } from 'rxjs';
import { isNullOrEmptyOrUndefined } from '../../../utilities/util';

@Injectable()
export class ScheduledNotificationService extends AbstractRestService {
    protected controllerName: string;
    constructor() {
        super();
        this.controllerName = 'notification-scheduler';
    }

    count(searchKey: string) {
        const params = isNullOrEmptyOrUndefined(searchKey) ? 'count' : `count?searchKey=${searchKey}`;
        return this.get(params);
    }

    fetchScheduledNotifications(pageNumber: number, pageSize: number, searchKey?: any) {
        const params = isNullOrEmptyOrUndefined(searchKey)
            ? `?pageSize=${pageSize}&pageNumber=${pageNumber}`
            : `?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
        return this.get(params);
    }

    createScheduledNotification(notification) {
        return this.post('', notification);
    }

    updateScheduledNotification(notification) {
        return this.patch(`${notification.id}`, notification);
    }

    deleteScheduledNotification(id) {
        return this.delete(`${id}`);
    }
}
