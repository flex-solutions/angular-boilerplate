import { User } from './../../../shared/models/user.model';
import { BaseService } from './../../../shared/services/base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private baseService: BaseService) { }

  create(user: User) {
    const createUserUrl = this.baseService.buildApi('user');
    return this.baseService.post(createUserUrl, user).toPromise();
  }

  update(user: User) {
    const editUserUrl = this.baseService.buildApi('user');
    return this.baseService.put(editUserUrl, user).toPromise();
  }
}
