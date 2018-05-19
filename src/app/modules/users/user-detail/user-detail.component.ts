import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../../models/user-model';
import { UsersService } from '../users-service';
import { Location } from '@angular/common';
import { UserGroup } from '../../../models/user-group.model';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { userConfiguration } from '../../user.configuration';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  private userdetail: UserModel = new UserModel;

  // Constructor
  constructor(private userService: UsersService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) { }

  // Init user detail component
  ngOnInit() {
    this.getUserInfomation();
  }

  // Handle get user detail information.
  getUserInfomation() {
    if (this.userdetail !== null) {
      this.userService.getUserByEmail(this.userdetail.email).subscribe(user => this.userdetail = user);
    }
  }

  // Handle delete user.
  deleteUser() {
    this.userService.deleteUser(this.userdetail).subscribe(() => { this.goBack(); });
  }

  // Handle change user group.
  changeUserGroup() {
    this.goBack();
  }

  // Handle navigate to Edit user page.
  navigateToEditPage() {
    this.router.navigate([userConfiguration.editPageUrl], { relativeTo: this.route });
  }

  private goBack() {
    this.location.back();
  }
}
