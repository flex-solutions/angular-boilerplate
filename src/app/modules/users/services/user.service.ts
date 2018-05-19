import { BaseService } from './../../../shared/services/base.service';
import {
  ControllerConstant,
  ApiConstant
} from './../../../shared/constants/api-route.constant';
import { Injectable } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Injectable()
export class UserService {
  constructor(private baseService: BaseService) {}

  create(user: IUser) {
    const createUserUrl = this.baseService.buildApi(
      ControllerConstant.User,
      ApiConstant.create
    );
    return this.baseService.post(createUserUrl, user);
  }

  update(user: IUser) {}
}
