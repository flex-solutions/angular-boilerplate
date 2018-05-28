import { Observable } from 'rxjs';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Injectable } from '@angular/core';
import { UserGroup } from '../../../shared/models/user-group.model';

@Injectable()
export class UserGroupService extends AbstractRestService {
  protected controllerName: string;
  /**
   *
   */
  constructor() {
    super();
    this.controllerName = 'user-groups';
  }

  public create(usergroup: UserGroup) {
    return this.post('create', usergroup);
  }

  public update(usergroup: UserGroup) {
    return this.put(`update/${usergroup.id}`, usergroup);
  }

  public delete(_id: string) {
    return this.delete(_id);
  }

  public getById(_id: string) {
    return this.get(`${_id}`);
  }
}
