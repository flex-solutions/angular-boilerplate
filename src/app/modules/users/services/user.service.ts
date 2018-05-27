import { User } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { of, Observable } from 'rxjs';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';

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

  async remove(user: User) {
    const confirmMsg = this.translateService.translateWithParams('users-delete-dialog-confirm_message', user.username);
    await this.exDialog.openConfirm(confirmMsg).subscribe(result => {
      if (result) {
        // Submit button has clicked
        this.delete(user._id, user._id).subscribe(res => {
          // Show confirm message when delete success
          const notificationMsg = this.translateService.translateWithParams('users-delete-dialog-notification_message', user.username);
          this.notifier.showSuccess(notificationMsg);
        });
      }
    });
  }

  findOne(userId: string) {
    return this.get(userId);
  }

  getAllUser(): Observable<User[]> {
    return this.get<User[]>('');
  }

  // Handle get user by email.
  getUserById(userId: string): Observable<User> {
    return this.get<User>(userId);
  }
}
