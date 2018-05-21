import { User } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../../../shared/abstract/http-service.abstract';

@Injectable()
export class UserService extends AbstractHttpService {
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
