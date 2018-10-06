import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Observable } from 'rxjs';

@Injectable()
export class PushNotificationService extends AbstractRestService {

  protected controllerName: string;

  constructor() {
    super();
    this.controllerName = 'notification';
  }

  pushNotification(model: any): Observable<Response> {
    return this.post('', model);
  }
}
