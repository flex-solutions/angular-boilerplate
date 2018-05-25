import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {
    protected controllerName: string;
    constructor(private http: HttpClient) {
    }

    // Handle get user by email.
    getUserByEmail(emailAddress: string): Observable<User> {
        const url = `$''/${emailAddress}`;
        const user = new User;
        user._id = '1';
        user.fullname = 'Hieu Trung Tran';
        user.username = 'hieutran';
        user.email = 'hieutran@abc.com';
        user.avatar = 'https://placehold.it/100x100';
        user.position = 'Software Engineering';
        // return this.http.get<UserModel>(url).pipe();
        return of(user);
    }

    // Handle delete user.
    deleteUser(user: User): Observable<User> {
        const url = `$''/${user._id}`;
        return this.http.delete<User>(url, httpOptions).pipe();
    }
}
