import { View } from './../../../shared/models/view.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { of, Observable } from 'rxjs';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';
import { ModalSize } from '../../../shared/ui-common/modal/components/dialog.component';


@Injectable()
export class ViewService extends AbstractRestService {
  protected controllerName: string;
  constructor(private exDialog: ExDialog) {
    super();
    this.controllerName = 'views';
  }

  create(view: View) {
    return this.post('', view);
  }

  update(view: View) {
    return this.put(view._id, view);
  }

  remove(view: View) {
  }

  findOne(userId: string) {
    return this.get(userId);
  }

  getUsers(pageSize: number, pageNumber: number, searchKey?: string): Observable<View[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  // Handle get user by id.
  getUserById(viewId: string): Observable<View> {
    return this.get(`${viewId}/combinegroupname`);
  }
}
