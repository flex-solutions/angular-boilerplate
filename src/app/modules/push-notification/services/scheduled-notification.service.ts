import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';

@Injectable()
export class ScheduledNotificationService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = ''; // TODO
  }
}
