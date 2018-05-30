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
    return this.post('', usergroup);
  }

  public update(usergroup: UserGroup) {
    return this.put(usergroup._id, usergroup);
  }

  public delete(_id: string) {
    return this.delete(_id);
  }

  public getById(_id: string) {
    return this.get(_id);
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  public find(pageSize: number, pageNumber: number, searchKey?: string): Observable<UserGroup[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public getPermissionScheme(): Observable<any[]> {
    return this.getWithAbsoluteUrl(`permission?fields=name`);
  }

  public updatePermissionSchemeForUserGroup(usergroupId: string, schemeId: string) {
    return this.put(`updateSchemeForUserGroup/${usergroupId}`, { schemeId });
  }
}
