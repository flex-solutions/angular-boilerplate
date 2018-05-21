import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { ApplicationConfigurationService } from '../../../shared/services/application-configuration.service';

@Injectable()
export class UserService extends AbstractRestService {
  protected controllerName = 'users';

  create(user: IUser) {}

  update(user: IUser) {}
}
