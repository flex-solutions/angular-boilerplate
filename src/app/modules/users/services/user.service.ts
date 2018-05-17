import { Injectable } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { ApplicationConfigurationService } from '../../../shared/services/application-configuration.service';

@Injectable()
export class UserService extends AbstractRestService {
  constructor(configurationService: ApplicationConfigurationService) {
    super('users', configurationService);
  }

  create(user: IUser) {}

  update(user: IUser) {}
}
