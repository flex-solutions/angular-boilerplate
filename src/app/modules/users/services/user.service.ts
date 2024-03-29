import { User, ChangePasswordModel } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { of, Observable } from 'rxjs';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';
import { ModalSize } from '../../../shared/ui-common/modal/components/dialog.component';
import { GroupUserModalComponent } from '../components/group-user/group-user-modal';
import { AuthenticationTokenHelper } from '../../../utilities/authentication-token';

@Injectable()
export class UserService extends AbstractRestService {
  protected controllerName: string;
  constructor(private exDialog: ExDialog) {
    super();
    this.controllerName = 'users';
  }

  create(user: User) {
    return this.post('', user);
  }

  update(user: User) {
    return this.put(user._id, user);
  }

  remove(user: User) {
    return new Promise((resolve, reject) => {
      const confirmMsg = this.translateService.translate('users-delete-dialog-confirm_message', user.username);
      const confirmTle = this.translateService.translate('users-list-title-confirm-dialog');
      this.exDialog.openConfirm(confirmMsg, confirmTle).subscribe(result => {
        if (result) {
          // Submit button has clicked
          this.delete(user._id, user._id).subscribe(res => {
            // Show confirm message when delete success
            const notificationMsg = this.translateService.translate('users-delete-dialog-notification_message', user.username);
            this.notifier.showSuccess(notificationMsg);
            resolve(true);
          });
        } else {
          reject(false);
        }
      });
    });
  }

  getUsers(pageSize: number, pageNumber: number, searchKey?: string): Observable<User[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  changeUserGroup(userId: string, ugId: string) {
    return this.put(`${userId}/changeUserGroup?ugId=${ugId}`, {});
  }

  // Handle get user by id.
  getUserById(userId: string): Observable<User> {
    return this.get(userId);
  }

  getUsersByGroupName(groupName: string, pageSize: number, pageNumber: number, searchKey?: string): Observable<User[]> {
    return this.get(`getUsersByGroupName/${groupName}?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  countUsersByGroupName(groupName: string, searchKey?: string): Observable<number> {
    return this.get(`getUsersByGroupName/${groupName}/count?searchKey=${searchKey}`);
  }

  changePassword(model: ChangePasswordModel) {
    return this.patch(`changepassword`, model);
  }
}
