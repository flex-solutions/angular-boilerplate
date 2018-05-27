import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserNavigationRoute } from '../../users.constant';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  userdetail: User = new User;

  // Constructor
  constructor(private userService: UserService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotificationService) { }

  // Init user detail component
  ngOnInit() {
    this.getUserInfomation();
  }

  // Handle get user detail information.
  getUserInfomation() {
    if (this.userdetail !== null) {
      this.userService.getUserById(this.userdetail._id).subscribe(user => this.userdetail = user);
    }
  }

  // Handle delete user.
  deleteUser() {
    this.userService.remove(this.userdetail);
  }

  // Handle change user group.
  changeUserGroup() {
    this.goBack();
  }

  // Handle navigate to Edit user page.
  navigateToEditPage() {
    this.router.navigate([UserNavigationRoute.EDIT_USER_PAGE, this.userdetail._id]);
  }

  private goBack() {
    this.location.back();
  }
}
