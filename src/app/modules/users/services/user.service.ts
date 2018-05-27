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
    // Just 4 test
    const user = new User;
    user._id = 'sdjf';
    user.fullname = 'Hieu Trung Tran';
    user.username = 'hieutran';
    user.email = 'hieutran@abc.com';
    user.avatar = 'https://placehold.it/100x100';
    user.position = 'Software Engineering';

    const users: User[] = [];
    users.push(user);
    users.push(user);

    return of(users);
    // return this.get<User[]>('users').pipe();
  }

  // Handle get user by email.
  getUserById(userId: string): Observable<User> {
    // Mock
    const url = `$''/${userId}`;
    const user = new User;
    user._id = '1';
    user.fullname = 'Hieu Trung Tran';
    user.username = 'hieutran';
    user.email = 'hieutran@abc.com';
    user.avatar = 'https://placehold.it/100x100';
    user.position = 'Software Engineering';
    // return this.http.get<User>(url).pipe();
    return of(user).pipe();
  }

  // Handle delete user.
  deleteUser(user: User): Observable<User> {
    // Just 4 test
    const url = `$''/${user._id}`;
    return this.delete<User>(url, user).pipe();
  }


}
