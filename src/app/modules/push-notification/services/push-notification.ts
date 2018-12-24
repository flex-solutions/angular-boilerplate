import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { from, Observable } from 'rxjs';
import { isNullOrEmptyOrUndefined } from '../../../utilities/util';

@Injectable()
export class PushNotificationService extends AbstractRestService {
    protected controllerName: string;
    constructor() {
        super();
        this.controllerName = 'notification';
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

    getScheduledNotificationById(id) {
      return this.get(`${id}`);
    }

    createScheduledNotification(notification) {
        return this.post('', notification);
    }

    updateScheduledNotification(id, notification) {
        return this.patch(`${id}`, notification);
    }

    deleteScheduledNotification(id) {
        return this.delete(`${id}`);
    }

    pushNotificationNow(model: any): Observable<Response> {
      return this.post('push-notification-now', model);
    }
}
