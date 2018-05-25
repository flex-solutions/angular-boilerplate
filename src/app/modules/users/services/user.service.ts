import { User } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';

@Injectable()
export class UserService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'users';
  }

  create(user: User) {
    return this.post('', user);
  }

  update(user: User) {
    return this.put(user._id, user);
  }

  remove(userId: string) {
    return this.delete(userId, userId);
  }

  findOne(userId: string) {
    return this.get(userId);
  }
}
