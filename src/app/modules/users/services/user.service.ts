import { User } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { of, Observable } from 'rxjs';

@Injectable()
export class UserService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'users';
  }

  create(user: User) {
    return this.post('', user);
  }

  update(user: User) {
    return this.put(user._id, user);
  }

  remove(userId: string) {
    return this.delete(userId, userId);
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
