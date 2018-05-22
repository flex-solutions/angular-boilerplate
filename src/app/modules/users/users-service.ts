import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {
     protected controllerName: string;
     constructor(private http: HttpClient) {
      }

     // Handle get user by email.
     getUserByEmail(emailAddress: string): Observable<UserModel> {
          const url = `$''/${emailAddress}`;
          const user = new UserModel;
          user.uid = 1;
          user.fullName = 'Hieu Trung Tran';
          user.accountName = 'hieutran';
          user.email = 'hieutran@abc.com';
          user.imagePath = 'https://placehold.it/100x100';
          user.position = 'Software Engineering';
          // return this.http.get<UserModel>(url).pipe();
          return of(user);
     }

     // Handle delete user.
     deleteUser(user: UserModel): Observable<UserModel> {
          const url = `$''/${user.uid}`;
          return this.http.delete<UserModel>(url, httpOptions).pipe();
     }
}
