import { UserMessages } from './../user.message';
import { TranslateService } from './../../../shared/services/translate.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { BaseService } from './../../../shared/services/base.service';
import {
  ControllerConstant,
  ApiConstant
} from './../../../shared/constants/api-route.constant';
import { Injectable } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';

@Injectable()
export class UserService {
  constructor(
    private baseService: BaseService,
    private notificationSerice: NotificationService,
    private translateService: TranslateService
  ) {}

  create(user: IUser) {
    const createUserUrl = this.baseService.buildApi(
      ControllerConstant.User,
      ApiConstant.create
    );
    this.baseService.post(createUserUrl, user).subscribe(
      respond => {
        // * Create user successful, display success notification
        const msg = this.translateService.translate(
          UserMessages.CreateUserSuccessfull
        );
        this.notificationSerice.showSuccess(msg);
      },
      error => {
        // * Failed to create user
        this.notificationSerice.showError(error);
      }
    );
  }

  update(user: IUser) {}
}
