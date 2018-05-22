import { User } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';

@Injectable()
export class UserService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'user';
  }

  create(user: User) {
    return this.post('create', user).toPromise();
  }

  update(user: User) {
    return this.put('update', user).toPromise();
  }
}
