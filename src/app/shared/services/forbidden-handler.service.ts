import { ObservableEventBase } from '../abstract/observable.base';
import { Injectable } from '@angular/core';


export class ForbiddenEvent extends ObservableEventBase<any> {
    constructor() {
      super();
    }
  }

@Injectable()
export class ForbiddenHandler {
  protected forbiddenEvent: ForbiddenEvent = new ForbiddenEvent();
  public publish() {
      this.forbiddenEvent.publish(true);
  }

  public subscribe(callback: any) {
      this.forbiddenEvent.subscribe(callback);
  }
}
