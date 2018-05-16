import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user-model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
// Just test
  // userdetail: UserModel = {
  //   uid: 1,
  //   fullName: 'Hieu Trung Tran',
  //   accountName: 'hieutran',
  //   email: 'thomas@gmail.com',
  //   imagePath: 'string',
  //   position: 'Developer',

  //   loginCount: 1,
  //   lastLogin: new Date(),
  //   previousLogin: new Date(),
  //   lastFailedLogin: new Date(),
  //   currentFailedLogin: 2,
  //   totalFailedLogin: 2
  // };
  userdetail: UserModel = new UserModel;

  constructor() { }

  ngOnInit() {
    this.userdetail.fullName = 'Hieu Trung Tran';
  }

}
